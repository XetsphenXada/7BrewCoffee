import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function DropDownMenuLinkAdmin() {
    // const [records, setRecords] = useState();
    
    // //TODO: Add conditional rendering so that non admin level users will not see this return
    // useEffect(() => {
    //     fetch("http://localhost:3000/user", {
    //       headers: {
    //         "content-type": "application/json",
    //         "authorization": localStorage.getItem("jwt-token")
    //       }
    //     })
    //     .then(response => response.json())
    //     .then(data => setRecords(data))
    //     .catch(err => console.log(err))
    //   }, []);
      
    //   console.log(records);
    //   console.log(records.userInfo);
    //   console.log(records.userInfo.role);
    
  return (
    <>
        <Link to='addadmin'>Add Manager</Link>
        <Link to='addemployee'>Add Employee</Link>
        <Link to='allusers'>View All Users</Link>
    </>
  )
}
