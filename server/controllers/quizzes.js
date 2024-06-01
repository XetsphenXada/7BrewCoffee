import { Router } from "express";
import allQuizzes from "../quiz-data/quiz-all.json" with { type: "json" }

const router = Router();

// return single quiz based on param
router.get("/quiz/:quizParam", (request, response) => { // !! will need user validation middleware 
    try {
        // find quiz questions that match quizParam
        const quizQuestions = allQuizzes.filter((quiz) => quiz.quizParam === request.params.quizParam);

        // send quiz data as response
        response.send(quizQuestions);
    }
    catch(err) {
        response.status(500).send({
            message: err.message
        });
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