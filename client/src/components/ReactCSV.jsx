import { CSVLink } from "react-csv";
import { useLoaderData } from "react-router-dom";

export async function csvLoader() {
    const response = await fetch("http://localhost:3000/quiz/results/all", {
        method: "GET",
        headers: { "Content-type": "application/json", authorization: localStorage.getItem("jwt-token") }
    });
    const resultsBody = await response.json();
    let resultsData = [];
    resultsBody.forEach((result) => {
        resultsData.push({
            user: {
                firstName: result.user.firstName,
                lastName: result.user.lastName,
                email: result.user.email
            },
            quizName: result.quiz.quizName,
            totalQuestions: Object.keys(result.questions).length,
            numCorrect: result.numCorrect,
            score: result.score,
            date: result.date
        });
    });
    return { resultsData };
}

export default function ReactCSV() {
    const { resultsData } = useLoaderData();

    const headers = [
        {label: "Quiz Name", key: "quizName"},
        {label: "First Name", key: "user.firstName"},
        {label: "Last Name", key: "user.lastName"},
        {label: "Email", key: "user.email"},
        {label: "Total Questions", key: "totalQuestions"},
        {label: "Correct Questions", key: "numCorrect"},
        {label: "Score", key: "score"},
        {label: "Test Date", key: "date"}
    ];

    return (
        <div className="m-5 self-center">
            <CSVLink
                data={resultsData}
                headers={headers}
                filename="testFIle"
                className="btn btn-primary"
                target="_blank"
            >
                Download
            </CSVLink>
        </div>
    )
}