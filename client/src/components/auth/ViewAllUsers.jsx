import React, { useState, useEffect } from 'react';

export default function ViewAllUsers() {
    const [records, setRecords] = useState([]);
    
    //this useEffect block allows us to fetch from the /user get request we set on the back end, then save each user into our setRecords useState
    useEffect(() => {
        fetch("http://localhost:3000/user")
        .then(response => response.json())
        .then(data => setRecords(data))
        .catch(err => console.log(err))
    }, [records])
    
    
  return (
    <div>
        All Employees
    </div>
  )
}
