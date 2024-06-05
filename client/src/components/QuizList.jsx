import { Link, useLoaderData } from "react-router-dom";

export async function quizListLoader() {
    const response = await fetch("http://localhost:3000/quiz");
    const quizList = await response.json();
    return { quizList };
}

export default function QuizList() {
    const { quizList } = useLoaderData();

    return (
        <div className="flex flex-col items-center m-5">
            <div className="text-5xl mb-7">Quizzes</div>
            <ul className="menu bg-base-200 w-3/5 rounded-box items-center">
                {quizList.map((quiz, i) => (
                    <li key={i}>
                        <Link to={`${quiz.quizParam}`}>{quiz.quizName}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}