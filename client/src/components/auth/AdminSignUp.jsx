import React, { useState } from 'react';
import { hash } from "bcryptjs";

//! prop for setToken needs to be changed to token when this gets put on the page
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
                        "content-type": "application/json",
                        "authorization": localStorage.getItem("jwt-token")
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
                    //!token being stored in localstorage and saved as setToken (remove in production build)
                    localStorage.setItem("jwt-token", body.token);
                    setToken(body.token);
                    console.log(body.token);
                } else {
                    console.log(body.message);
                }
            }
        })
    }
    
    return (
        <form onSubmit={submitAdminManagerSignup} className="prose flex flex-col items-center border-2 border-black w-1/4 p-6 bg-white">
            <h1 className='text-primary'>Add Manager</h1>
            <label>
                <div className='text-black'>Email:</div>
                <input className='border-2 border-secondary' placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
            </label>
            <label>
                <div className='text-black'>First Name:</div>
                <input className='border-2 border-secondary' placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}></input>
            </label>
            <label>
                <div className='text-black'>Middle Name:</div>
                <input className='border-2 border-secondary' placeholder="Middle Name" onChange={(e) => setMiddleName(e.target.value)}></input>
            </label>
            <label>
                <div className='text-black'>Last Name:</div>
                <input className='border-2 border-secondary' placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}></input>
            </label>
            <label>
                <div className='text-black'>Store Location:</div>
                <input className='border-2 border-secondary' placeholder="Store Location" onChange={(e) => setStoreLocation(e.target.value)}></input>
            </label>
            <label>
                <div className='text-left text-black'>Role:</div>
                <select className='bg-primary text-secondary w-full border-2 border-secondary' onChange={(e) => setRole(e.target.value)}>
                    <option value="">Please choose an option</option>
                    <option>Admin</option>
                    <option>Regional Manager</option>
                    <option>Manager</option>
                </select>
            </label>
            <label>
                <div className='text-black'>Password:</div>
                <input className='border-2 border-secondary' placeholder="Password" type='password' onChange={(e) => setPassword(e.target.value)}></input>
            </label>
            <button type='submit' className='btn btn-primary mt-10'>Submit</button>
        </form>
  )
}
