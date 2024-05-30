import React, { useState, useEffect } from 'react';

export default function ViewAllUsers() {
    const [records, setRecords] = useState([]);
    
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
    }, [records])
    
  return (
    <>
      <div className='flex flex-col justify-center items-center h-screen'>
        <div className='text-4xl font-bold mb-[16px] border-b-4 border-secondary text-primary'>
          All Employees
        </div>
        <div className='overflow-x-auto'>
          <table className='table'>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Last Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {records.map((list, index) => (
                <tr>
                      <td key={index}>{list.firstName}</td>
                      <td key={index}>{list.middleName}</td>
                      <td key={index}>{list.lastName}</td>
                      <td key={index}>{list.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
