import express from "express"
import Student from "../models/student.js";
import getStudents, { postStudents } from "../controllers/studentControllers.js";


const studentRouter = express.Router();


studentRouter.get("/",getStudents)


studentRouter.post("/",postStudents)

export default  studentRouter;
