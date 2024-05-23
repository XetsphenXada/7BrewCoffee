import React, { useState } from 'react';
import { hash } from "bcryptjs";


export default function AdminSignUp() {
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
                } else {
                    console.log(body.message);
                }
            }
        })
    }
    
    return (
        <form onSubmit={submitAdminManagerSignup} class="prose flex flex-col items-center border-2 border-black w-1/3">
            <h1>AdminSignUp</h1>
        </form>
  )
}
