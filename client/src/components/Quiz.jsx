import { useState } from "react";
import { useLoaderData } from 'react-router-dom'

export async function quizLoader({ params }) {
    const quizResponse = await fetch(`http://localhost:3000/quiz/${params.quizParam.toLowerCase()}`);
    const userResponse = await fetch("http://localhost:3000/user", {
        method: "GET",
        headers: { "Content-type": "application/json", authorization: localStorage.getItem("jwt-token") }
    });
    
    if(quizResponse.status === 200 && userResponse.status === 200) {
        const quiz = await quizResponse.json();
        const user = await userResponse.json();
        return { 
            quiz,
            user,
            error: false
         };
    }
    else {
        const quiz = await quizResponse.text();
        const user = await userResponse.text();
        return { 
            quiz,
            user,
            error: true
         };
    }
}

export default function Quiz() {
    // retrieve selected quiz data on load
    const { quiz, user, error } = useLoaderData();
    if(error) {
        return <div>{quiz}{user}</div>
    }

    const [selectedAnswers, setSelectedAnswers] = useState([]);

    async function submitQuiz(event) {
        event.preventDefault();
        // only allow submit if all questions are answered
        if(quiz.length !== selectedAnswers.length) {
            console.log("all questions must be answered")
            return;
        }
        // calculate number correct and incorrect
        let numCorrect = 0;
        let numIncorrect = 0;
        selectedAnswers.forEach((question) => {
            if(question.isCorrect) {
                numCorrect++;
            }
            else {
                numIncorrect++;
            }
        });

        // convert answers to full answers for database
        let uploadQuestions = [];
        selectedAnswers.forEach((answer) => {
            uploadQuestions.push({
                question: answer.question,
                chosenAnswer: answer.chosenAnswerText,
                correctAnswer: answer.correctAnswerText,
                isCorrect: answer.isCorrect
            });
        });

        // calculate score 
        const score = (numCorrect / quiz.length) * 100;
        const testResults = {
            user: {
                firstName: user.userInfo.firstName,
                lastName: user.userInfo.lastName,
                email: user.userInfo.email,
                userId: user.userInfo.userId
            },
            testName: quiz[0].quizName,
            numCorrect,
            numIncorrect,
            questions: uploadQuestions,
            score
        }

        // send quiz results to database
        const response = await fetch("http://localhost:3000/quiz", {
            method: "POST",
            headers: { 
                "Content-type": "application/json", 
                authorization: localStorage.getItem("jwt-token") 
            },
            body: JSON.stringify(testResults)
        });

        if(!response.ok) {
            console.error("Failed to upload test results to database");
            return;
        }
        // !!! redirect back to quiz list
        console.log("redirect to quiz list")
    }

    function gatherCheckboxAnswers(event, singleQuestion) {
        const question = singleQuestion.question;
        const correctAnswer = singleQuestion.answer;
        const chosenAnswer = event.target.value;
        const correctAnswerText = correctAnswer.map((choice) => choice = singleQuestion.answerChoices[choice]);
        let chosenAnswerText = [];
        let isCorrect;
        // if question is not already in selectedAnswers...
        if(!selectedAnswers.some((answer) => answer.question === question)) {
            chosenAnswerText.push(singleQuestion.answerChoices[chosenAnswer]);
            // set isCorrect
            isCorrect = singleQuestion.answer.every((choice) => [chosenAnswer].includes(choice));
            // add question, chosen answer, and correct answer to selectedAnswers
            setSelectedAnswers([...selectedAnswers, { question, chosenAnswer: [chosenAnswer], chosenAnswerText, correctAnswerText, isCorrect }]);
        }
        // if question is already in selectedAnswers...
        else {
            let tempAnswers = selectedAnswers;
            const answerToChangeIndex = tempAnswers.findIndex((answer) => answer.question === question);
            // if answer is already checked...
            if(tempAnswers[answerToChangeIndex].chosenAnswer.includes(chosenAnswer)) {
                const choiceIndex = tempAnswers[answerToChangeIndex].chosenAnswer.findIndex((choice) => choice === chosenAnswer);
                // remove from answer list
                tempAnswers[answerToChangeIndex].chosenAnswer.splice(choiceIndex, 1);
                tempAnswers[answerToChangeIndex].chosenAnswerText.splice(choiceIndex, 1);
            }
            // if answer is not checked yet...
            else {
                // add to answer list
                tempAnswers[answerToChangeIndex].chosenAnswer.push(chosenAnswer);
                tempAnswers[answerToChangeIndex].chosenAnswerText.push(singleQuestion.answerChoices[chosenAnswer]);
            }

            // set isCorrect
            tempAnswers[answerToChangeIndex].isCorrect = singleQuestion.answer.every((choice) => tempAnswers[answerToChangeIndex].chosenAnswer.includes(choice));
            setSelectedAnswers(tempAnswers);
        }
    }
    
    function gatherRadioAnswers(event, singleQuestion) {
        const question = singleQuestion.question;
        const correctAnswer = singleQuestion.answer;
        const chosenAnswer = event.target.value;
        const correctAnswerText = singleQuestion.answerChoices[correctAnswer];
        let chosenAnswerText;
        let isCorrect;

        // if question is not already in selectedAnswers...
        if(!selectedAnswers.some((answer) => answer.question === question)) {
            chosenAnswerText = singleQuestion.answerChoices[chosenAnswer];
            // set isCorrect
            isCorrect = (singleQuestion.answerChoices[chosenAnswer] === singleQuestion.answerChoices[correctAnswer]);
            // add question, chosen answer, and correct answer to selectedAnswers
            setSelectedAnswers([...selectedAnswers, { question, chosenAnswer, chosenAnswerText, correctAnswerText, isCorrect }]);
        }
        // if question is already in selectedAnswers...
        else {
            // update chosen answer on matching question
            let tempAnswers = selectedAnswers;
            const answerToChangeIndex = tempAnswers.findIndex((answer) => answer.question === question);
            // change chosen answer to new answer
            tempAnswers[answerToChangeIndex].chosenAnswer = chosenAnswer;
            tempAnswers.chosenAnswerText = singleQuestion.answerChoices[chosenAnswer];
            // set isCorrect
            tempAnswers[answerToChangeIndex].isCorrect = (singleQuestion.answerChoices[chosenAnswer] === singleQuestion.answerChoices[correctAnswer]);
            setSelectedAnswers(tempAnswers);
        }
    }


    return (
        <div className="flex flex-col items-center m-5">
            <div className="text-5xl mb-7">{quiz[0].quizName}</div>
            <form onSubmit={submitQuiz}>
                <div>
                    {quiz.map((singleQuestion, i) => (
                        <div key={i}>
                            <div className="text-2xl">{singleQuestion.question}</div>
                            {singleQuestion.questionType === "selectAll" ? (
                                <>
                                    {Object.keys(singleQuestion.answerChoices).map((choice, j) => (
                                        <div key={j} className="form-control flex-row">
                                            <label className="label cursor-pointer">
                                                <input type="checkbox" name={`checkbox-${i}`} value={choice} onChange={(event) => gatherCheckboxAnswers(event, singleQuestion)} className="checkbox m-3" />
                                                <span className="text-lg">{singleQuestion.answerChoices[choice]}</span>
                                            </label>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {Object.keys(singleQuestion.answerChoices).map((choice, j) => (
                                        <div key={j} className="form-control flex-row">
                                            <label className="label cursor-pointer">
                                                <input type="radio" name={`radio-${i}`} value={choice}  onChange={(event) => gatherRadioAnswers(event, singleQuestion)} className="radio m-3" />
                                                <span>{singleQuestion.answerChoices[choice]}</span>
                                            </label>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-around w-full">
                    <button className="btn btn-neutral">Cancel</button>
                    <button className="btn btn-primary" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}