const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const Program = require("../../model/Academic/Program");
const Subject = require("../../model/Academic/Subject");

//@desc create subject
//route POST /api/v1/subject/:ID
exports.createSubject = AsyncHandler(async (req, res) => {
    const { name, description, academicTerm} = req.body;
    //find the program
    const programFound = await Program.findById(req.params.programID);
    if (!programFound) {
        throw new Error("program not found");
    }
    //check if exists
    const subjectFound = await Subject.findOne({ name });
    if (subjectFound) {
        throw new Error("subject already exists");
    }
    //create
    const subjectCreated = await Subject.create({
        name,
        description,
        academicTerm,
        createdBy: req.userAuth._id,
    });

    //push to the program
    programFound.subjects.push(subjectCreated._id);
    //save
    await programFound.save();
    res.status(201).json({
        status:"success",
        message: "Program created successfully",
        data: subjectCreated,
    });
});

//@desc get ALL subjects
//route GET /api/v1/subjects
//access  Private
exports.getSubjects = AsyncHandler(async (req, res) => {
    const classes = await Subject.find({});
    res.status(201).json({
        status:"success",
        message: "Subjects fetched successfully",
        data: classes,
    });
});

//@desc get SINGLE subject
//route GET /api/v1/subjects/:id
//access  Private
exports.getProgram = AsyncHandler(async (req, res) => {
    const program = await Subject.findById(req.params.id);

    res.status(201).json({
        status:"success",
        message: "Subject fetched successfully",
        data: program,
    });
});

//@desc update subject
//route PUT /api/v1/subjects/:id
//access  Private
exports.updateSubject = AsyncHandler(async (req, res) => {
    const { name, description, academicTerm } = req.body;
    //check name exists
    const subjectFound = await Subject.findOne({name})
    if(subjectFound){
        throw new Error("Program already exists");
    }
    const subject = await Subject.findByIdAndUpdate(req.params.id,
        {
            name, 
            description,
            academicTerm,
            createdBy: req.userAuth._id,
        },
        {
            new: true,
        }
    );

    res.status(201).json({
        status:"success",
        message: "subject updated successfully",
        data: subject,
    });
});

//@desc delete subject
//route Delete /api/v1/subjects/:id
//access  Private
exports.deleteSubject = AsyncHandler(async (req, res) => {
 await Subject.findByIdAndDelete(req.params.id);
    res.status(201).json({
        status:"success",
        message: "subject deleted successfully",
    });
});