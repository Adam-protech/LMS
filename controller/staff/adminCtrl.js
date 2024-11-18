const AsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Admin = require("../../model/Staff/Admin");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");
const { hashPassword, isPassMatched } = require("../../utils/helpers");

//add description as register admin
//route POST /api/admins/register
//access  Private
exports.registerAdmCtrl = AsyncHandler(async (req, res)=> {
    const { name, email, password } = req.body;
        //check if email exists
        const adminFound = await Admin.findOne({ email });
        if (adminFound){
            throw new Error("Admin Exists");
        }
        //register
        const user = await Admin.create({
            name,
            email,
            password: await hashPassword(password),
        });
        res.status(201).json({
            status:"success",
            data: user,
            message: "Admin registered successfully",
        });
});

//desc         login admins
//route       POST/api/admins/login
//access       Private
exports.loginAdminCtrl = AsyncHandler(async (req, res)=> {
    const { email, password } = req.body;
        //find user
        const user = await Admin.findOne({ email });
        if(!user){
            return res.json({ message: "Invalid login credentials"});
        }
        //verify password
        const isMatched = await isPassMatched(password, user.password);

        if(!isMatched) {
            return res.json({ message: "invalid login credentials"});
        } else {
            return res.json({
                data: generateToken(user._id),
                message: "Admin logged in successfully",
            });
        }
});

//desc        get alladmins
//route       GET/api/v1/admins/admins
//access       Private
exports.getAdminsCtrl = AsyncHandler(async (req, res)=> {
  res.status(200).json(res.results);
}) ;

//desc        get single admins
//route       GET/api/v1/admins/:id
//access       Private
exports.getAdminProfileCtrl = AsyncHandler(async (req, res)=> {
    const admin = await Admin.findById(req.userAuth._id).select("-password -createdAt -updatedAt"
    )
    .populate("academicYears")
    .populate("academicTerms")
    .populate("programs")
    .populate("yearGroups")
    .populate("classLevels")
    .populate("students");
    if(!admin){
        throw new Error("Admin Not found")
    }else{
        res.status(200).json({
            status: "success",
            data: admin,
            message: "Admin profile fetched successfully"
        });
    }
});

//desc        update admins
//route       UPDATE/api/v1/admins/:id
//access       Private
exports.updateAdminCtrl = AsyncHandler(async(req, res) => {
    const {email, name, password} = req.body
   //if email is taken
   const emailExist = await Admin.findOne({email})
   if(emailExist){
    throw new Error("This email is taken/exist")
   }

   //hash password

 //check if user is updating password
 if(password){
        //update
        const admin = await Admin.findByIdAndUpdate(req.userAuth._id, {
            email,
            password: await hashPassword(password),
            name,
        },
        {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: "success",
            data: admin,
            message: "Admin updated succesfully",
        });
 }else{
      //update
      const admin = await Admin.findByIdAndUpdate(req.userAuth._id, {
        email, 
        password: await hashPassword(password),
        name,
    },
    {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: "success",
        data: admin,
        message: "Admin updated succesfully",
    });
 }
});

//desc        delete admins
//route       DELETE/api/v1/admins/:id
//access       Private
exports.deleteAdminCtrl = (req, res)=> {
    try {
        res.status(201).json({
            status:"success",
            data:"delete admin"
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};

//desc        admin suspend teacher
//route       PUT/api/v1/admins/suspend/teacher:id
//access       Private
exports.adminSuspendTeacherCtrl = (req, res)=> {
    try {
        res.status(201).json({
            status:"success",
            data:"admin suspend teacher"
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};

//desc        admin unsuspend teacher
//route       PUT/api/v1/admins/unsuspend/teacher:id
//access       Private
exports.adminUnSuspendTeacherCtrl = (req, res)=> {
    try {
        res.status(201).json({
            status:"success",
            data:"admin Unsuspend teacher"
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};

//desc        admin withdraw teacher
//route       PUT/api/v1/admins/withdraw/teacher:id
//access       Private
exports.adminWithdrawTeacherCtrl = (req, res)=> {
    try {
        res.status(201).json({
            status:"success",
            data:"admin withdraw teacher"
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};

//desc        admin unwithdraw teacher
//route       PUT/api/v1/admins/unwithdraw/teacher:id
//access       Private
exports.adminUnWithdrawTeacherCtrl = (req, res)=> {
    try {
        res.status(201).json({
            status:"success",
            data:"admin Unwithdraw teacher"
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};

//desc        admin publish teacher
//route       PUT/api/v1/admins/publish/exam/:id
//access       Private
exports.adminPublishResultsCtrl = (req, res)=> {
    try {
        res.status(201).json({
            status:"success",
            data:"admin publish exam result"
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};

//desc        admin unpublish teacher
//route       PUT/api/v1/admins/unpublish/exam/:id
//access       Private
exports.adminUnPublishResultsCtrl = (req, res)=> {
    try {
        res.status(201).json({
            status:"success",
            data:"admin unpublish exam result"
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};