import React, { useState } from 'react';

//list prop contains the data we fetched from our get request in "ViewAllUsers.jsx"
export default function EditUserButton({ list }) {
    
    async function submitUserEdit(event) {
      event.preventDefault();
      // console.log(event.target);
      // console.log(event.target.firstName);
      // console.log(event.target.firstName.value);
      
      const data = new FormData(event.target);
      
      console.log(data);
      
      //fetch request for our edit endpoint
      const response = await fetch(`http://localhost:3000/allusers/${list._id}`, {
        method: "PUT",
        headers: {
          "content-type" : "application/json",
          "authorization": localStorage.getItem("jwt-token")
        },
        body: JSON.stringify(
          Object.fromEntries(data)
        )
        })
          
      const body = await response.json();

      if(response.status === 200) {
        console.log("User has been updated");
      } else {
        console.log(body.message);
      }
      
      //refreshes the page when the form is submitted
      location.reload();
    };
    
  return (
    <>
      <button
        className="btn"
        onClick={() => document.getElementById(list._id+"edit").showModal()}
      >
        Edit
      </button>
      <dialog id={list._id+"edit"} className="modal" list={list}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Edit {list.firstName} {list.lastName}</h3>
          <div className='flex flex-col justify-center items-center'>
          <form method="dialog" className='flex flex-col' onSubmit={submitUserEdit}>
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <label>
              <div className='text-black mb-0.5'>First Name:</div>
              <input className='border-2 border-secondary w-full' placeholder="First Name" name="firstName"></input>
            </label>
            <label>
                <div className='text-black'>Middle Name:</div>
                <input className='border-2 border-secondary w-full' placeholder="Middle Name" name="middleName"></input>
            </label>
            <label>
                <div className='text-black'>Last Name:</div>
                <input className='border-2 border-secondary w-full' placeholder="Last Name" name="lastName"></input>
            </label>
            <label>
                <div className='text-black'>Email:</div>
                <input className='border-2 border-secondary w-full' placeholder="Email" name="email"></input>
            </label>
            <label>
                <div className='text-black'>Store Location:</div>
                <input className='border-2 border-secondary w-full' placeholder="Store Location" name="storeLocation"></input>
            </label>
            <label>
                <div className='text-left text-black'>Role:</div>
                <select className='bg-primary text-secondary w-full border-2 border-secondary' name="role">
                    <option value="">Please choose an option</option>
                    <option>Admin</option>
                    <option>Regional Manager</option>
                    <option>Manager</option>
                    <option>Shift Leader</option>
                    <option>Brewista</option>
                </select>
            </label>
            {/* if there is a button in form, it will close the modal */}
            <button type='submit' className='btn btn-primary mt-4'>Submit</button>
          </form>
          <p className="py-4">Submit your edit, or press ESC key to close</p>
          </div>
        </div>
      </dialog>
    </>
  );
}
