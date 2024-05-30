import { useEffect, useState } from "react";

export default function Quiz() {
    const [quiz, setQuiz] = useState([]);

    const param = "grindsAdjustment"; // !! need params from react router

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
        <div className="flex flex-col m-5">
            <div>{quiz[0].quizName}</div>
            <form>
                {quiz.map((singleQuestion, i) => (
                    <div>
                        <div key={i}>{singleQuestion.question}</div>
                        {Object.values(singleQuestion.answerChoices).map((choice, j) => (
                            <div className="form-control flex-row">
                                <label className="label cursor-pointer">
                                    <input type="radio" name={`radio-${i}`} className="radio m-3" />
                                    <span key={j}>{choice}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
            </form>
        </div>
    )
}