import React, { useState } from 'react';
import { hash } from "bcryptjs";


export default function AdminSignUp({ setToken }) {
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("");
    const [storeLocation, setStoreLocation] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    function submitAdminManagerSignup(event) {
        event.preventDefault();
        
        hash(password, 10, async (err, passwordHash) => {
            if (err) {
                console.log(err);
            } else {
                const response = await fetch("http://localhost:3000/signup", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        firstName,
                        middleName,
                        lastName,
                        role,
                        storeLocation,
                        email,
                        password: passwordHash
                    })
                })
                console.log(response);
                //create a variable called body to hold the responses we get from the back end converts the response to json so we can read it
                const body = await response.json();
                if (response.status === 200) {
                    //save jwt to local storage using setItem method
                    localStorage.setItem("jwt-token", body.token);
                    setToken(body.token);
                } else {
                    console.log(body.message);
                }
            }
        })
    }
    
    return (
        <div>AdminSignUp</div>
  )
}
