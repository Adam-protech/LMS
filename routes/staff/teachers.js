const express = require("express");
const {
     adminRegisterTeacher, 
     loginTeacher,
     getAllTeachersAdmin, 
     getTeacherByAdmin,
     getTeacherProfile,
     teacherUpdateProfile,
     adminUpdateTeacher,
 } = require("../../controller/staff/teachersCtrl");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");
const advancedResults = require("../../middlewares/advanceResults");
const Teacher = require("../../model/Staff/Teacher");
const teachersRouter = express.Router();

teachersRouter.post("/admin/register", isLogin, isAdmin, adminRegisterTeacher);
teachersRouter.post("/login", loginTeacher);
teachersRouter.get("/admin", isLogin, isAdmin, advancedResults(Teacher, {
    path: "examsCreated", populate:{
        path: "questions",
    }
}), getAllTeachersAdmin);
teachersRouter.get("/profile",isTeacherLogin, isTeacher, getTeacherProfile);
teachersRouter.get("/:teacherID/admin", isLogin, isAdmin, getTeacherByAdmin);
teachersRouter.put("/:teacherID/update", isTeacherLogin, isTeacher, teacherUpdateProfile);
teachersRouter.put("/:teacherID/update/admin", isLogin, isAdmin, adminUpdateTeacher);


module.exports = teachersRouter;