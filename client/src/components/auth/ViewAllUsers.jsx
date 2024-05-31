import React, { useState, useEffect } from 'react';

export default function ViewAllUsers() {
    const [records, setRecords] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("Select Location");
    
    //this useEffect block allows us to fetch from the /user get request we set on the back end, then save each user into our setRecords useState
    useEffect(() => {
        fetch("http://localhost:3000/allusers", {
          headers: {
            "content-type": "application/json",
            "authorization": localStorage.getItem("jwt-token")
          }
        })
        .then(response => response.json())
        .then(data => setRecords(data))
        .catch(err => console.log(err))
    }, [selectedLocation])
    
    //returns an array that only lists the store locations of each user
    const storeLocations = records.map((records) => records.storeLocation)
    
    //returns an array that only lists one instance of each store location returned in the previous array using spread operator and Set constructor
    const uniqueLocation = [...new Set(storeLocations)];
    
  return (
    <>
      <div className='flex flex-col justify-center items-center h-screen'>
        <div className='text-6xl font-bold text-primary mb-[12px]'>
          All Employees
        </div>
        <div className='border-2 border-secondary mb-[16px] w-[30rem]'></div>
        <div className='flex flex-col w-72'>
          <label className='text-secondary text-lg font-bold flex justify-center'>Choose a store location:</label>
          <select className='mb-[16px] border-2 border-secondary' onChange={ (e) => {console.log("options changed"); setSelectedLocation(e.target.value)}}>
            <option value="">--Select Location--</option>
            {console.log(uniqueLocation)}
            {uniqueLocation.map((i) => (
                <option key={i}>{i}</option>
            ))}
          </select>
        </div>
        <div className='overflow-x-auto border-2 border-secondary'>
          <table className='table'>
            <thead>
              <tr className='border-primary text-primary'>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Store Location</th>
                <th>Created By</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {records.map((list, index) => (
                <tr key={index} className='border-secondary text-secondary'>
                      <td>{list.firstName}</td>
                      <td>{list.middleName}</td>
                      <td>{list.lastName}</td>
                      <td>{list.email}</td>
                      <td>{list.role}</td>
                      <td>{list.storeLocation}</td>
                      <td>{list.createdBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
