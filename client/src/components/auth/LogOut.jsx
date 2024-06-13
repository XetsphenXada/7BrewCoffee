import React from 'react'
import { Link } from 'react-router-dom'

export default function LogOut() {
    
  return (
    <Link 
    to="/" 
    className='btn bg-neutral text-accent hover:bg-primary hover:text-accent rounded-xl mx-8'
    onClick={() => {
        localStorage.removeItem("jwt-token")
        location.reload()
    }}
    >
        Log Out
    </Link>
  )
}
