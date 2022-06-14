import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import CustomAPIError from "../errors/custom-api.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment"
import "moment/locale/es.js"



const createJob = async (req, res) => {
  const { position, company } = req.body;
  if (!position || !company) {
    throw new CustomAPIError(
      "Por favor, rellena todos los campos",
      StatusCodes.BAD_REQUEST
    );
  }

  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json(job);
};

const getAllJobs = async (req, res) => {
  const {status, jobType, search, sort} = req.query
  const queryObject = {}

  if (status && status !== "todos"){
    queryObject.status = status
  }

  if (jobType && jobType !== "todos"){
    queryObject.jobType = jobType
  }

  if (search){
    queryObject.position = {$regex: search, $options: "i"}
  }


  let result = Job.find(queryObject);

  if(sort === "más recientes"){
    result = result.sort('-createdAt')
  }
  if(sort === "más antiguas"){
    result = result.sort('createdAt')
  }
  if(sort === "a-z"){
    result = result.sort('position')
  }
  if(sort === "z-a"){
    result = result.sort('-position')
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip =  (page - 1) * limit
  result = result.skip(skip).limit(limit)

  const jobs = await result

  const totalJobs = await Job.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalJobs / limit)
  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs, numOfPages });
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position } = req.body;
  if (!company || !position) {
    throw new CustomAPIError(
      "Por favor, rellena todos los campos",
      StatusCodes.BAD_REQUEST
    );
  }

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new CustomAPIError(
      `No hay oferta que corresponde con el id: ${jobId}`,
      StatusCodes.NOT_FOUND
    );
  }

  //   job.position = position
  //   job.company = company
  //   ...other properties
  //   await job.save()

  checkPermissions(req.user, job.createdBy);

  const updatedJob = await Job.findByIdAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedJob });
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    throw new CustomAPIError(
      `No hay oferta que corresponde con el id: ${jobId}`,
      StatusCodes.NOT_FOUND
    );
  }
  checkPermissions(req.user, job.createdBy);
  await job.remove();
  res.status(StatusCodes.OK).json({ msg: "La oferta ha sido eliminada" });
};

const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pendiente: stats.pendiente || 0,
    rechazado: stats.rechazado || 0,
    entrevista: stats.entrevista || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        cuenta: { $sum: 1 },
      },
    },
    {$sort: {'_id.year': -1, '_id.month': -1}},
    {$limit: 6}
  ]);

  monthlyApplications = monthlyApplications.map(item => {
   const {_id: {year, month}, cuenta} = item 
   moment.locale("es");
   const date = moment().month(month -1).year(year).format("MMM Y")
   return {date, cuenta}
  }).reverse()

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
