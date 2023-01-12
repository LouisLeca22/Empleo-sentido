import moment from "moment";
import "moment/locale/es";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import Wrapper from "../assets/wrappers/Job.js";
import { useAppContext } from "../context/appContext";
import JobInfo from "./JobInfo.jsx";

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdBy,
  createdAt,
  status,
}) => {

  const {setEditJob, deleteJob, user} = useAppContext()
  moment.locale("es");
  let date = moment(createdAt).format("Do MMMM YYYY");

  return <Wrapper>
      <header>

      <div className="main-icon">{company.charAt(0)}</div>
      <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
      </div>
      </header>
      <div className="content">
          <div className="content-center">
              <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
              <JobInfo icon={<FaCalendarAlt />} text={date} />
              <JobInfo icon={<FaBriefcase />} text={jobType} />
              <div className={`status ${status}`}>{status}</div>
          </div>
          {user && user._id === createdBy && 
                   <footer>
                   <div className="actions">
                       <Link to="/add-job" onClick={() => setEditJob(_id)} className="btn edit-btn">
                           Modificar
                       </Link>
                       <button type="button" className="btn delete-btn" onClick={() => deleteJob(_id)}>Borrar</button>
                   </div>
               </footer>
          }
   
      </div>
  </Wrapper>;
};
export default Job;
