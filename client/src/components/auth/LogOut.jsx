import React from 'react'
import { Link } from 'react-router-dom'

export default function LogOut() {
    
  return (
    <Link 
    to="/user/login" 
    className='btn btn-accent mx-8 border-x-[16px]'
    onClick={() => {
        localStorage.removeItem("jwt-token")
    }}
    >
        Log Out
    </Link>
  )
}
