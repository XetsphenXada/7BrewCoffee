import { Router } from "express";
import allQuizzes from "../quiz-data/quiz-all.json" with { type: "json" }
import TestResult from "../models/testResults.js";
import validationMiddleware from "../middleware/validationMiddleware.js";

const router = Router();

// return single quiz based on param
router.get("/quiz/:quizParam", (request, response) => { // !! will need user validation middleware 
    try {
        // find quiz questions that match quizParam
        const quizQuestions = allQuizzes.filter((quiz) => quiz.quizParam.toLowerCase() === request.params.quizParam.toLowerCase());

        // send quiz data as response
        response.send(quizQuestions);
    }
    catch(err) {
        response.status(500).send({
            message: err.message
        });
    }
});

// send quiz reults to database
router.post("/quiz", validationMiddleware, async (request, response) => { // need to add validationMiddleware once log in works
    if(request.user) {
        try {
            const quizResults = new TestResult({
                user: request.body.user,
                testName: request.body.testName,
                numCorrect: request.body.numCorrect,
                numIncorrect: request.body.numIncorrect,
                questions: request.body.questions,
                score: request.body.score
            })
            await quizResults.save();

            response.send({
                message: "Quiz results successfully added to database."
            });
        }
        catch(err) {
            response.status(500).send({
                message: err.message
            });
        }
    }
    else {
        response.status(500).send({
            message: "You must be logged in to submit a quiz."
        })
    }
});

// return list of quiz names
router.get("/quiz", (request, response) => {
    try {
        // make array of different quiz names
        let quizNames = [];
        let quizParams = [];
        allQuizzes.forEach((quiz) => {
            if(!quizParams.includes(quiz.quizParam)) {
                quizNames.push(quiz.quizName);
                quizParams.push(quiz.quizParam);
            }
        });
        
        // send quiz names as array
        response.send(quizNames)
    }
    catch(err) {
        response.status(500).send({
            message: err.message
        });
    }
});

export default router;