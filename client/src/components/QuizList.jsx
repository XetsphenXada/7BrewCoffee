import { Link, useLoaderData, useOutletContext } from "react-router-dom";

export async function quizListLoader() {
    const quizListesponse = await fetch("http://localhost:3000/quiz");
    const testResultResponse = await fetch("http://localhost:3000/quiz/results", {
        method: "GET",
        headers: { "Content-type": "application/json", authorization: localStorage.getItem("jwt-token") }
    })

    if(quizListesponse.status === 200 && testResultResponse.status === 200) {
        const quizList = await quizListesponse.json();
        const testResults = await testResultResponse.json();
        return { quizList, testResults, error: false };
    }
    else {
        const quizList = await quizListesponse.text();
        const testResults = await testResultResponse.text();
        return { quizList, testResults, error: true };
    }
}

export default function QuizList() {
    const { quizList, testResults, error } = useLoaderData();
    if(error) return <div>{quizList}{testResults}</div>;
    
    const { userInfo } = useOutletContext();

    async function findUserTestData(event) {
        event.preventDefault();
        console.log(userInfo)
        console.log(quizList)
        console.log(testResults)
    }

    // use testResult
    // if isPassing doesn't exist, display nothing next to test name
    // if isPassing is false, display red X for failure
    // if isPassing is true, display green check for passing
    return (
        <div className="flex flex-col items-center m-5">
            <div className="text-5xl mb-7">Quizzes</div>
            <button className="btn bg-primary" onClick={findUserTestData}>Test</button>
            <ul className="menu flex flex-col bg-base-200 w-3/5 rounded-box items-center">
                {quizList.map((quiz, i) => (
                    <div key={i} className="m-4 w-10/12 h-20 flex justify-between rounded-lg hover:bg-neutral-300">
                        <Link to={`${quiz.quizParam}`} className="text-2xl">{quiz.quizName}</Link>
                        <div className="bg-red-700 h-full mask mask-star-2">hello</div>
                    </div>
                ))}
            </ul>
        </div>
    )
}