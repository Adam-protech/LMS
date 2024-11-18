const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const ClassLevel = require("../../model/Academic/ClassLevel");
const Program = require("../../model/Academic/Program");

//@desc create Program
//route POST /api/v1/programs
exports.createProgram = AsyncHandler(async (req, res) => {
    const { name, description} = req.body;
    //check if exists
    const programFound = await Program.findOne({ name });
    if (programFound) {
        throw new Error("program already exists");
    }
    //create
    const programCreated = await Program.create({
        name,
        description,
        createdBy: req.userAuth._id,
    });
    //push program into admin
    const admin = await Admin.findById(req.userAuth._id);
    admin.programs.push(programCreated._id);
    //save
    await admin.save();

    res.status(201).json({
        status:"success",
        message: "Program created successfully",
        data: programCreated,
    });
});

//@desc get ALL programs
//route GET /api/v1/programs
//access  Private
exports.getPrograms = AsyncHandler(async (req, res) => {
    const programs = await Program.find({});
    res.status(201).json({
        status:"success",
        message: "Programs fetched successfully",
        data: programs,
    });
});

//@desc get SINGLE Program
//route GET /api/v1/programs/:id
//access  Private
exports.getProgram = AsyncHandler(async (req, res) => {
    const program = await Program.findById(req.params.id);

    res.status(201).json({
        status:"success",
        message: "Program fetched successfully",
        data: program,
    });
});

//@desc update Program
//route PUT /api/v1/programs/:id
//access  Private
exports.updateProgram = AsyncHandler(async (req, res) => {
    const { name, description } = req.body;
    //check name exists
    const programFound = await ClassLevel.findOne({name})
    if(programFound){
        throw new Error("Program already exists");
    }
    const program = await Program.findByIdAndUpdate(req.params.id,
        {
            name, 
            description,
            createdBy: req.userAuth._id,
        },
        {
            new: true,
        }
    );

    res.status(201).json({
        status:"success",
        message: "Program updated successfully",
        data: program,
    });
});

//@desc delete Program
//route Delete /api/v1/programs/:id
//access  Private
exports.deleteProgram = AsyncHandler(async (req, res) => {
 await Program.findByIdAndDelete(req.params.id);
    res.status(201).json({
        status:"success",
        message: "Program deleted successfully",
    });
});