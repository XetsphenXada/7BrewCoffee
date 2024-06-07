import React from "react";

//list prop contains the data we fetched from our get request in "ViewAllUsers.jsx"
export default function EditUserButton({ list }) {
  async function submitUserEdit(event) {
    
    //create a variable that holds our data recieved from Form Data (event.target."name".value) in an object
    const data = new FormData(event.target);
    
    //create a new object so we may use it in the for loop below to only enter valid data into our object
    let dataObj = {}
    
    //!TODO: If user sends in data that already exists it will still send it to the database (this shouldn't be happen ideally)
    
    //!TODO: Need to provide a check for current Email Addresses in the database,
    //!TODO  and dissallow the user from updating their user with existing email addresses
    
    //This for of loop validates the data being entered into our request.body by checking for empty strings and
    // preventing them from being entered into the object being used for the body in our fetch request
    for (let [key, value] of data.entries())
      {
        if (value.trim() !== ''){
          dataObj[key] = value
        };
      }
        
    console.log(dataObj);

    //fetch request for our edit endpoint
    const response = await fetch(`http://localhost:3000/allusers/${list._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("jwt-token"),
      },
      body: JSON.stringify(dataObj),
    });

    const body = await response.json();

    if (response.status === 200) {
      console.log("User has been updated");
    } else {
      console.log(body.message);
    }

    //refreshes the page when the form is submitted
    //location.reload();
  }

  function closeModal() {
    document.getElementById(list._id + "edit").close();
  }

  return (
    <>
      <button
        className="btn"
        onClick={() => document.getElementById(list._id + "edit").showModal()}
      >
        Edit
      </button>
      <dialog id={list._id + "edit"} className="modal" list={list}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            Edit {list.firstName} {list.lastName}
          </h3>
          <div className="flex flex-col justify-center items-center">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
            <form
              method="dialog"
              className="flex flex-col"
              onSubmit={submitUserEdit}
            >
              <label>
                <div className="text-black mb-0.5">First Name:</div>
                <input
                  className="border-2 border-secondary w-full"
                  placeholder="First Name"
                  name="firstName"
                ></input>
              </label>
              <label>
                <div className="text-black">Middle Name:</div>
                <input
                  className="border-2 border-secondary w-full"
                  placeholder="Middle Name"
                  name="middleName"
                ></input>
              </label>
              <label>
                <div className="text-black">Last Name:</div>
                <input
                  className="border-2 border-secondary w-full"
                  placeholder="Last Name"
                  name="lastName"
                ></input>
              </label>
              <label>
                <div className="text-black">Email:</div>
                <input
                  className="border-2 border-secondary w-full"
                  placeholder="Email"
                  name="email"
                ></input>
              </label>
              <label>
                <div className="text-black">Store Location:</div>
                <input
                  className="border-2 border-secondary w-full"
                  placeholder="Store Location"
                  name="storeLocation"
                ></input>
              </label>
              <label>
                <div className="text-left text-black">Role:</div>
                <select
                  className="bg-primary text-secondary w-full border-2 border-secondary"
                  name="role"
                >
                  <option value="">Please choose an option</option>
                  <option>Admin</option>
                  <option>Regional Manager</option>
                  <option>Manager</option>
                  <option>Shift Leader</option>
                  <option>Brewista</option>
                </select>
              </label>
              {/* if there is a button in form, it will close the modal */}
              <button type="submit" className="btn btn-primary mt-4">
                Submit
              </button>
            </form>
            <p className="py-4">Submit your edit, or press ESC key to close</p>
          </div>
        </div>
      </dialog>
    </>
  );
}
