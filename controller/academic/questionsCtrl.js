const AsyncHandler = require("express-async-handler");
const Question = require("../../model/Academic/Question");
const Exam = require("../../model/Academic/Exam");


//@desc create Question
//route POST /api/v1/questions/:examID
//access  Private Teachers only

exports.createQuestion = AsyncHandler(async (req, res) => {
    const {
         question, 
         optionA, 
         optionB, 
         optionC, 
         optionD, 
         correctAnswer, 
        } = req.body;
        //find the exam
        const examFound = await Exam.findById(req.params.examID);
        if (!examFound) {
            throw new Error("Exam not found");
        }
        //check if question
        const questionExists = await Question.findOne({question})
        if (questionExists) {
            throw new Error("Question already exists");
        }
        //create exam
        const questionCreated = await Question.create({
            question,
            optionA,
            optionB,
            optionC,
            optionD,
            correctAnswer,
            createdBy: req.userAuth._id,
        });
        //add the question into exam
        examFound.questions.push(questionCreated?._id);
        //save
        await examFound.save();
        res.status(201).json({
            status: "success",
            message: "Question created",
            data: questionCreated,
        });
});


//@desc get ALL questions
//route GET /api/v1/questions
//access  Private - Teacher only
exports.getQuestions = AsyncHandler(async (req, res) => {
    const questions = await Question.find({});
    res.status(201).json({
        status:"success",
        message: "Questions fetched successfully",
        data: questions,
    });
});


//@desc get SINGLE Question
//route GET /api/v1/questions/:id
//access  Private
exports.getQuestion = AsyncHandler(async (req, res) => {
    const question = await Question.findById(req.params.id);
    res.status(201).json({
        status:"success",
        message: "Question fetched successfully",
        data: question,
    });
});


//@desc update Question
//route PUT /api/v1/questions/:id
//access  Private Teacher only
exports.updateQuestion = AsyncHandler(async (req, res) => {
    const {   
        question, 
        optionA, 
        optionB, 
        optionC, 
        optionD, 
        correctAnswer,
     } = req.body;
    //check name exists
    const questionFound = await Question.findOne({ question })
    if(questionFound){
        throw new Error("Question already exists");
    }
    const program = await Question.findByIdAndUpdate(req.params.id,
        {
            question, 
            optionA, 
            optionB, 
            optionC, 
            optionD, 
            correctAnswer,
            createdBy: req.userAuth._id,
        },
        {
            new: true,
        }
    );

    res.status(201).json({
        status:"success",
        message: "Question updated successfully",
        data: program,
    });
});