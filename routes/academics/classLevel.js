const express = require("express");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const { 
    createClassLevel, 
    deleteClassLevel,
     getClassLevel, 
     getClassLevels,
    updateclassLevel ,
 } = require("../../controller/academic/classLevel");

const classLevelRouter = express.Router();

// academicTermRouter.post("/", isLogin, isAdmin, createAcademicYear);
// academicTermRouter.get("/", isLogin, isAdmin, getAcademicYears);

classLevelRouter
.route("/")
.post(isLogin, isAdmin, createClassLevel)
.get( isLogin, isAdmin, getClassLevels);

classLevelRouter
.route("/:id")
.get(isLogin, isAdmin, getClassLevel)
.put(isLogin, isAdmin, updateclassLevel)
.delete(isLogin, isAdmin, deleteClassLevel);

// academicTermRouter.get("/:id", isLogin, isAdmin, getAcademicYear);
// academicTermRouter.put("/:id", isLogin, isAdmin, updateAcademicYear);
// academicTermRouter.delete("/:id", isLogin, isAdmin, deleteAcademicYear);

module.exports = classLevelRouter;