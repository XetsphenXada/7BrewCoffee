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
                const response = await fetch("http://localhost:3000/addAdmin", {
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
                
                const body = await response.json();
                if (response.status === 200) {
                    console.log("Admin has been created");
                } else {
                    console.log(body.message);
                }
            }
        })
        //refresh the page after submission
        location.reload();
    }
    
    return (
        <div className='flex justify-center  overflow-y-auto  h-1/8'>
        <form onSubmit={submitAdminManagerSignup} className="prose flex flex-col card border-2 border-secondary shadow-2xl p-6 overflow-y-auto">
            <div className='flex justify-center'>
            <h1 className='text-primary'>Add Manager</h1>
            </div>
            <label>
                <div className='text-black'>Email:</div>
                <input className='border-2 border-secondary w-full' placeholder="Email" onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}></input>
            </label>
            <div className='flex gap-1'>
            <label>
                <div className='text-black'>First Name:</div>
                <input className='border-2 border-secondary' placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}></input>
            </label>
            <label>
                <div className='text-black'>Middle Name:</div>
                <input className='border-2 border-secondary w-11/12' placeholder="Middle Name" onChange={(e) => setMiddleName(e.target.value)}></input>
            </label>
            <label>
                <div className='text-black'>Last Name:</div>
                <input className='border-2 border-secondary' placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}></input>
            </label>
            </div>
            <label>
                <div className='text-black'>Store Location:</div>
                <input className='border-2 border-secondary w-full' placeholder="Store Location" onChange={(e) => setStoreLocation(e.target.value)}></input>
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
                <input className='border-2 border-secondary w-full' placeholder="Password" type='password' onChange={(e) => setPassword(e.target.value)}></input>
            </label>
            <button type='submit' className='btn btn-primary mt-10'>Submit</button>
        </form>
        </div>
  )
}
