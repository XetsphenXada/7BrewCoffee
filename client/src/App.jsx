import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import Flashcards from './components/Flashcards'
import LogIn from './components/auth/Login'
import AdminSignUp from './components/auth/AdminSignUp';
import EmpCreation from './components/auth/EmpCreation';


function App() {
	const [token, setToken] = useState(localStorage.getItem("jwt-token"));
	
	return (
		<>
		<Routes>
        <Route
          path="/login"
          element={<LogIn setToken={setToken}></LogIn>}
        />
		<Route path="/signup" element={<AdminSignUp />}/>
		<Route path="/adduser" element={<EmpCreation />}/>
      	</Routes>
		</>
	)
}

export default App
