import React from 'react'
import { Link } from 'react-router-dom'

export default function LogOut() {
    
  return (
    <Link 
    to="/user/login" 
    className='btn btn-accent bg-primary rounded-xl mx-8'
    onClick={() => {
        localStorage.removeItem("jwt-token")
    }}
    >
        Log Out
    </Link>
  )
}
