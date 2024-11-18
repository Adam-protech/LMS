const express = require("express");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const { 
    createProgram,
    getPrograms,
    getProgram,
    updateProgram,
    deleteProgram, 
} = require("../../controller/academic/programs");
const programRouter = express.Router();

// academicTermRouter.post("/", isLogin, isAdmin, createAcademicYear);
// academicTermRouter.get("/", isLogin, isAdmin, getAcademicYears);

programRouter
.route("/")
.post(isLogin, isAdmin, createProgram)
.get( isLogin, isAdmin, getPrograms);

programRouter
.route("/:id")
.get(isLogin, isAdmin, getProgram)
.put(isLogin, isAdmin, updateProgram)
.delete(isLogin, isAdmin, deleteProgram);

// academicTermRouter.get("/:id", isLogin, isAdmin, getAcademicYear);
// academicTermRouter.put("/:id", isLogin, isAdmin, updateAcademicYear);
// academicTermRouter.delete("/:id", isLogin, isAdmin, deleteAcademicYear);

module.exports = programRouter;