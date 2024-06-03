import { useEffect, useState } from "react";
import { useLoaderData, useParams } from 'react-router-dom'

export async function quizLoader({ params }) {
    // const { quizParam } = useParams();
    const response = await fetch(`http://localhost:3000/quiz/${params.quizParam}`);
    const quizJson = await response.json();
    return { quizJson };
}

async function submitQuiz(event) {
    event.preventDefault();
    console.log("quiz submit")
    // send quiz results to database

}

export default function Quiz() {

    // retrieve selected quiz data on load
    const quiz = useLoaderData();

    return (
        <div className="flex flex-col items-center m-5">
            <div className="text-5xl mb-7">{quiz.quizJson[0].quizName}</div>
            <form onSubmit={submitQuiz}>
                <div>
                    {quiz.quizJson.map((singleQuestion, i) => (
                        <div key={i}>
                            <div className="text-2xl">{singleQuestion.question}</div>
                            {singleQuestion.questionType === "selectAll" ? (
                                <>
                                    {Object.values(singleQuestion.answerChoices).map((choice, j) => (
                                        <div key={j} className="form-control flex-row">
                                            <label className="label cursor-pointer">
                                                <input type="checkbox" name={`checkbox-${i}`} className="checkbox m-3" />
                                                <span className="text-lg">{choice}</span>
                                            </label>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {Object.values(singleQuestion.answerChoices).map((choice, j) => (
                                        <div key={j} className="form-control flex-row">
                                            <label className="label cursor-pointer">
                                                <input type="radio" name={`radio-${i}`} className="radio m-3" />
                                                <span>{choice}</span>
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
                    <button className="btn btn-accent" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}