const express = require("express");
const { 
     registerAdmCtrl,
     adminPublishResultsCtrl,
     adminSuspendTeacherCtrl,
     adminUnPublishResultsCtrl,
     adminUnSuspendTeacherCtrl,
     adminUnWithdrawTeacherCtrl,
     adminWithdrawTeacherCtrl,
     deleteAdminCtrl,
     getAdminProfileCtrl,
     getAdminsCtrl,
     loginAdminCtrl,
     updateAdminCtrl,
     } = require("../../controller/staff/adminCtrl");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const advancedResults = require("../../middlewares/advanceResults");
const Admin = require("../../model/Staff/Admin");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const roleRestriction = require("../../middlewares/roleRestriction");

const adminRouter = express.Router();

//register admin
adminRouter.post("/register", registerAdmCtrl);

//Login
adminRouter.post("/login", loginAdminCtrl)

//get all
adminRouter.get("/", isLogin, advancedResults(Admin), getAdminsCtrl);

//single
adminRouter.get("/profile", isAuthenticated(Admin), roleRestriction("admin"), getAdminProfileCtrl);

//update
adminRouter.put("/", isLogin, roleRestriction("admin"),  updateAdminCtrl);

//Delete
adminRouter.delete("/:id", deleteAdminCtrl);


//suspend
adminRouter.put("/suspend/teacher/:id", adminSuspendTeacherCtrl);
//unsuspend
adminRouter.put("/unsuspend/teacher/:id", adminUnSuspendTeacherCtrl);

//withdraw
adminRouter.put("/withdraw/teacher/:id", adminWithdrawTeacherCtrl );

//unwithdraw
adminRouter.put("/unwithdraw/teacher/:id", adminUnWithdrawTeacherCtrl);

//publish exams
adminRouter.put("/publish/exam/:id", adminPublishResultsCtrl );

//unpublish exams
adminRouter.put("/unpublish/exams/:id", adminUnPublishResultsCtrl);
module.exports = adminRouter;