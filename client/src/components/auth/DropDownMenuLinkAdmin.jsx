import React from 'react'
import { Link } from 'react-router-dom'

export default function DropDownMenuLinkAdmin() {
    
    //TODO: Add conditional rendering so that non admin level users will not see this return
    
  return (
    <>
        <Link to='addadmin'>Add Manager</Link>
        <Link to='addemployee'>Add Employee</Link>
        <Link to='allusers'>View All Users</Link>
    </>
  )
}
