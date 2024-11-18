const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const Program = require("../../model/Academic/Program");
const Subject = require("../../model/Academic/Subject");
const YearGroup = require("../../model/Academic/YearGroup");

//@desc create year group
//route POST /api/v1/year group
exports.createYearGroup = AsyncHandler(async (req, res) => {
    const { name, academicYear } = req.body;

    //check if exists
    const yeargroup = await YearGroup.findOne({ name });
    if (yeargroup) {
        throw new Error("Year Group/Graduation already exists");
    }
    //create
    const yearGroup = await YearGroup.create({
        name,
        academicYear,
        createdBy: req.userAuth._id,
    });
    //push to the program
    //find the admin
    const admin = await Admin.findById(req.userAuth._id)
    if(!admin){
        throw new Error("Admin not found");
    }
    //push year group into admin
    admin.yearGroups.push(yearGroup._id)
    //save
    await admin.save();
    res.status(201).json({
        status:"success",
        message: "Year created Group successfully",
        data: yearGroup,
    });
});

//@desc get ALL Year Group
//route GET /api/v1/Year Groups
//access  Private
exports.getYearGroups = AsyncHandler(async (req, res) => {
    const groups = await YearGroup.find({});
    res.status(201).json({
        status:"success",
        message: "Year Groups fetched successfully",
        data: groups,
    });
});

//@desc get SINGLE year group
//route GET /api/v1/year-group/:id
//access  Private
exports.getYearGroup = AsyncHandler(async (req, res) => {
    const group = await YearGroup.findById(req.params.id);
    res.status(201).json({
        status:"success",
        message: "Year Group fetched successfully",
        data: group,
    });
});

//@desc update year Group
//route PUT /api/v1/year-groups/:id
//access  Private
exports.updateYearGroup = AsyncHandler(async (req, res) => {
    const { name, academicYear } = req.body;
    //check name exists
    const yearGroupFound = await YearGroup.findOne({name})
    if(yearGroupFound){
        throw new Error("year group already exists");
    }
    const yearGroup = await YearGroup.findByIdAndUpdate(req.params.id,
        {
            name, 
            academicYear,
            createdBy: req.userAuth._id,
        },
        {
            new: true,
        }
    );

    res.status(201).json({
        status:"success",
        message: "year Group updated successfully",
        data: yearGroup,
    });
});

//@desc delete Year GROUP
//route Delete /api/v1/year group/:id
//access  Private
exports.deleteYearGroup = AsyncHandler(async (req, res) => {
 await YearGroup.findByIdAndDelete(req.params.id);
    res.status(201).json({
        status:"success",
        message: "Year Group deleted successfully",
    });
});