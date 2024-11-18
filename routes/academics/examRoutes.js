const express = require("express");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");
const { 
    createExam,
    getExams, 
    getExam, 
    updateExam,
 } = require("../../controller/academic/examsCtrl");

const examRouter = express.Router();

examRouter.route("/",)
.post(isTeacherLogin, isTeacher,  createExam)
.get( isTeacherLogin, isTeacher, getExams);

examRouter
.route("/:id")
.get( isTeacherLogin, isTeacher , getExam)
.put( isTeacherLogin, isTeacher, updateExam);

module.exports = examRouter;