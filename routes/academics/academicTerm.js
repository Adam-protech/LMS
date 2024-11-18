const express = require("express");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const { 
    createAcademicTerm, 
    deleteAcademicTerm,
    getAcademicTerm,
    getAcademicTerms,
    updateAcademicTerms,
} = require("../../controller/academic/academicTermCtrl");

const academicTermRouter = express.Router();

// academicTermRouter.post("/", isLogin, isAdmin, createAcademicYear);
// academicTermRouter.get("/", isLogin, isAdmin, getAcademicYears);

academicTermRouter
.route("/")
.post(isLogin, isAdmin, createAcademicTerm)
.get( isLogin, isAdmin, getAcademicTerms);

academicTermRouter
.route("/:id")
.get(isLogin, isAdmin, getAcademicTerm)
.put(isLogin, isAdmin, updateAcademicTerms)
.delete(isLogin, isAdmin, deleteAcademicTerm);

// academicTermRouter.get("/:id", isLogin, isAdmin, getAcademicYear);
// academicTermRouter.put("/:id", isLogin, isAdmin, updateAcademicYear);
// academicTermRouter.delete("/:id", isLogin, isAdmin, deleteAcademicYear);

module.exports = academicTermRouter;