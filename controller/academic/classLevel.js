const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const ClassLevel = require("../../model/Academic/ClassLevel");

//@desc create Class Level
//route POST /api/v1/class-levels
//access  Private
exports.createClassLevel = AsyncHandler(async (req, res) => {
    const { name, description, duration} = req.body;
    //check if exists
    const classFound = await ClassLevel.findOne({ name });
    if (classFound) {
        throw new Error("Class already exists");
    }
    //create
    const classCreated = await ClassLevel.create({
        name,
        description,
        createdBy: req.userAuth._id,
    });
    //push class into admin
    const admin = await Admin.findById(req.userAuth._id);
    admin.classLevels.push(classCreated._id);
    //save
    await admin.save();

    res.status(201).json({
        status:"success",
        message: "Class  created successfully",
        data: classCreated,
    });
});

//@desc get ALL class levels
//route GET /api/v1/class - levels
//access  Private
exports.getClassLevels = AsyncHandler(async (req, res) => {
    const classes = await ClassLevel.find({});
    res.status(201).json({
        status:"success",
        message: "Class levels fetched successfully",
        data: classes,
    });
});

//@desc get SINGLE Class Level
//route GET /api/v1/Class-Level/:id
//access  Private
exports.getClassLevel = AsyncHandler(async (req, res) => {
    const classLevel = await ClassLevel.findById(req.params.id);

    res.status(201).json({
        status:"success",
        message: "Class fetched successfully",
        data: ClassLevel,
    });
});

//@desc update Class Level
//route PUT /api/v1/Class-Level/:id
//access  Private
exports.updateclassLevel = AsyncHandler(async (req, res) => {
    const { name, description } = req.body;
    //check name exists
    const classFound = await ClassLevel.findOne({name})
    if(classFound){
        throw new Error("Class already exists");
    }
    const ClassLevel = await ClassLevel.findByIdAndUpdate(req.params.id,
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
        message: "Class updated successfully",
        data: ClassLevel,
    });
});

//@desc delete Class Level
//route Delete /api/v1/Class-Level/:id
//access  Private
exports.deleteClassLevel = AsyncHandler(async (req, res) => {
 await ClassLevel.findByIdAndDelete(req.params.id);
    res.status(201).json({
        status:"success",
        message: "Class Level deleted successfully",
    });
});