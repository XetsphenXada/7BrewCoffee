import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import Auth from './components/auth/Auth'
import AdminSignUp from './components/auth/AdminSignUp';
import Layout from './components/testpagelayoutcode';
import EmpCreation from './components/auth/EmpCreation';
import Flashcards from './components/Flashcards'
import Quiz from './components/Quiz'


function App() {
	const [token, setToken] = useState(localStorage.getItem("jwt-token"));
	
	return (
		<>
			<Routes>
				<Route
				path="/user/login"
				element={<Auth setToken={setToken} />} //pass update component as props
				/>
				<Route path="/signup" element={<AdminSignUp />}/>
				<Route path="/layout" element={<Layout />}/>
				<Route path="/adduser" element={<EmpCreation />}/>
			</Routes>
		</>
	)
}

export default App
