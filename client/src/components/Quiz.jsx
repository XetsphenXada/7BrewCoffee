import { useEffect, useState } from "react";

export default function Quiz() {
    const [quiz, setQuiz] = useState([]);

    const param = "flavorScoopExamples"; // !! need params from react router

    // retrieve selected quiz data on load
    useEffect(() => {
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
                            <div className="flex">
                                <input type="radio" className="radio" />
                                <div key={j}>{choice}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </form>
        </div>
    )
}