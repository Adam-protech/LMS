const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const AcademicTerm = require("../../model/Academic/AcademicTerm");


//@desc create academic Term
//route POST /api/v1/academic-terms
//access  Private
exports.createAcademicTerm = AsyncHandler(async (req, res) => {
    const { name, description, duration } = req.body;
    //check if exists
    const academicTerm = await AcademicTerm.findOne({ name });
    if (academicTerm) {
        throw new Error("Academic term already exists");
    }
    //create
    const academicTermCreated = await AcademicTerm.create({
        name,
        description,
        duration,
        createdBy: req.userAuth._id,
    });
    //push academic into admin
    const admin = await Admin.findById(req.userAuth._id);
    admin.academicTerms.push(academicTermCreated._id);
    await admin.save();
    res.status(201).json({
        status:"success",
        message: "Academic term created successfully",
        data: academicTermCreated,
    });
});

//@desc get ALL academic Terms
//route GET /api/v1/academic-terms
//access  Private
exports.getAcademicTerms = AsyncHandler(async (req, res) => {
    const academicTerms = await AcademicTerm.find({});

    res.status(201).json({
        status:"success",
        message: "Academic terms fetched successfully",
        data: academicTerms,
    });
});

//@desc get SINGLE academic term
//route GET /api/v1/academic-terms/:id
//access  Private
exports.getAcademicTerm = AsyncHandler(async (req, res) => {
    const academicTerms = await AcademicTerm.findById(req.params.id);

    res.status(201).json({
        status:"success",
        message: "Academic terms fetched successfully",
        data: academicTerms,
    });
});

//@desc update academic term
//route PUT /api/v1/academic-terms/:id
//access  Private
exports.updateAcademicTerms = AsyncHandler(async (req, res) => {
    const { name, description, duration } = req.body;
    //check name exists
    const createAcademicTermFound = await AcademicTerm.findOne({name})
    if(createAcademicTermFound){
        throw new Error("Academic terms already exists");
    }
    const academicTerms = await AcademicTerm.findByIdAndUpdate(req.params.id,
        {
            name, 
            description,
             duration,
            createdBy: req.userAuth._id,
        },
        {
            new: true,
        }
    );

    res.status(201).json({
        status:"success",
        message: "Academic terms updated successfully",
        data: academicTerms,
    });
});

//@desc delete academic term
//route Delete /api/v1/academic-terms/:id
//access  Private
exports.deleteAcademicTerm = AsyncHandler(async (req, res) => {
 await AcademicTerm.findByIdAndDelete(req.params.id);
    
    res.status(201).json({
        status:"success",
        message: "Academic term deleted successfully",
    });
});