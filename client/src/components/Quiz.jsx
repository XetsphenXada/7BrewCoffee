import { useEffect, useState } from "react";

export default function Quiz() {
    const [quiz, setQuiz] = useState([]);

    const param = "coffeeChillerAndSpecial7Principles"; // !! need params from react router

    // retrieve selected quiz data on load
    useEffect(() => { // needs useLoaderData to retrieve quiz data on first load
        async function getSelectedQuizData() {
            const response = await fetch(`http://localhost:3000/quiz/${param}`);
            const quizJson = await response.json();
            console.log(quizJson)
            setQuiz(quizJson);
        }
        getSelectedQuizData();
    }, []);

    return (
        <div className="flex flex-col items-center m-5">
            <div className="text-5xl mb-7">{quiz[0].quizName}</div>
            <form>
                {quiz.map((singleQuestion, i) => (
                    <>
                        <div key={i} className="text-2xl">{singleQuestion.question}</div>
                        {singleQuestion.questionType === "selectAll" ? (
                            <>
                                {Object.values(singleQuestion.answerChoices).map((choice, j) => (
                                    <div className="form-control flex-row">
                                        <label className="label cursor-pointer">
                                            <input type="checkbox" name={`checkbox-${i}`} className="checkbox m-3" />
                                            <span key={j} className="text-lg">{choice}</span>
                                        </label>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                {Object.values(singleQuestion.answerChoices).map((choice, j) => (
                                    <div className="form-control flex-row">
                                        <label className="label cursor-pointer">
                                            <input type="radio" name={`radio-${i}`} className="radio m-3" />
                                            <span key={j}>{choice}</span>
                                        </label>
                                    </div>
                                ))}
                            </>
                        )}
                    </>
                ))}
            </form>
            <div className="flex justify-around w-full">
                <button className="btn btn-neutral">Cancel</button>
                <button className="btn btn-accent">Submit</button>
            </div>
        </div>
    )
}