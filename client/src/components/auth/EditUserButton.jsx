import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function EditUserButton({ list }) {
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [storeLocation, setStoreLocation] = useState("");
    
    let { listId } = useParams();
    listId = list._id
    
    async function submitUserEdit() {
      
      const response = await fetch(`http://localhost:3000/allusers/${listId}`, {
        method: "PUT",
        headers: {
          "content-type" : "application/json",
          "authorization": localStorage.getItem("jwt-token")
        },
        body: JSON.stringify({
          firstName,
          middleName,
          lastName,
          email,
          role,
          storeLocation
        })
      })

      const body = await response.json();

      if(response.status === 200) {
        console.log("User has been updated");
      } else {
        console.log(body.message);
      }
    };
    
  return (
    <>
      <button
        className="btn"
        onClick={() => document.getElementById(list._id).showModal()}
      >
        Edit
      </button>
      <dialog id={list._id} className="modal" list={list}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Edit {list.firstName} {list.lastName}</h3>
          <div className='flex flex-col justify-center items-center'>
          <form method="dialog" className='flex flex-col' onSubmit={submitUserEdit}>
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <label>
              <div className='text-black mb-0.5'>First Name:</div>
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
                <div className='text-black'>Email:</div>
                <input className='border-2 border-secondary' placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
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
                    <option>Shift Leader</option>
                    <option>Brewista</option>
                </select>
            </label>
            <button type='submit' className='btn btn-primary mt-4'>Submit</button>
          </form>
          </div>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </>
  );
}
