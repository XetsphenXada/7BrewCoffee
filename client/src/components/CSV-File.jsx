import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

export default function csvFile() {
    const [userTestResults, setUserTestResults] = useState([]);

    useEffect(() => {
        fetch('')
            .then(response => response.json())
            .then(json => {
                let data = [];
                json.forEach((item) => {
                    let object = {
                        lastName: item.lastName,
                        firstName: item.firstName,
                        date: Date(),
                        numCorrect: item.numCorrect,
                        numIncorrect: item.numIncorrect,
                        score: item.score,
                        question: item.question[0],
                        answerSelected: item.answerSelected,
                        answerCorrect: item.answerCorrect,
                    }
                    data.push(object);
                })
                setUserTestResults(data);
            })
    },[])
}

return (
    <div>
        {/* table */}
        {users.length>0&&(
            <>
                <h3>Export Data Made Easy!</h3>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Last Name</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Date</th>
                            <th scope="col">Number of Correct Answers</th>
                            <th scope="col">Number of Incorrect Answers</th>
                            <th scope="col">Score</th>
                            <th scope="col">Question</th>
                            <th scope="col">Selected Answer</th>
                            <th scope="col">Correct Answer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.lastName}>
                                <th scope="row">{user.lastName}</th>
                                <td>{user.firstName}</td>
                                <td>{user.date}</td>
                                <td>{user.numCorrect}</td>
                                <td>{user.numIncorrect}</td>
                                <td>{user.score}</td>
                                <td>{user.question}</td>
                                <td>{user.answerSelected}</td>
                                <td>{user.answerCorrect}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* csv button to export */}
                <div className="csv-button">
                    <CSVLink data={userTestResults}>Export</CSVLink>
                </div>
            </>
        )}
    </div>
)