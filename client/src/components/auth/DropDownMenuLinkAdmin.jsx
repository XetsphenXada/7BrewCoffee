import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function DropDownMenuLinkAdmin() {
    //TODO: Add conditional rendering so that non admin level users will not see this return

    async function getUser() {
        let response = await fetch("http://localhost:3000/user", {
            method: "GET",
            headers: {
            "content-type": "application/json",
            "authorization": localStorage.getItem("jwt-token")
          }
        })
        
        const body = await response.json();
        
        if (response.status === 200) {
            // console.log(body.userInfo.role)
            return await body
        } else {
            console.log(body.message);
        }
    }
        
    let user = getUser();
    // console.log(user.then((promiseData) => promiseData))
    let userRole = user.then((promiseData) => promiseData.userInfo.role)
    console.log(userRole);
    
    if (userRole === "Admin") {
        console.log(true)
    } else {
        console.log(false)
    }
    
  return (
    <>
        <Link to='addadmin'>Add Manager</Link>
        <Link to='addemployee'>Add Employee</Link>
        <Link to='allusers'>View All Users</Link>
    </>
  )
}
