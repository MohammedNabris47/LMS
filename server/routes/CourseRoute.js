import express from "express";
import {
  getAllCourses,
  getCourseById,
} from "../controller/courseController.js";

const courseRouter = express.Router();

courseRouter.get("/all", getAllCourses);
courseRouter.get("/:id", getCourseById);

export default courseRouter;
