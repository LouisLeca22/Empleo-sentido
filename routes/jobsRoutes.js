import express from "express"
const router = express.Router()

import {createJob, deleteJob, getAllJobs, updateJob, showStats} from "../controllers/jobsController.js"
import authenticateUser from "../middleware/auth.js"


router.route("/").post(authenticateUser,createJob).get(getAllJobs)
router.route("/stats").get(authenticateUser, showStats)
router.route("/:id").delete(authenticateUser,deleteJob).patch(authenticateUser, updateJob)

export default router