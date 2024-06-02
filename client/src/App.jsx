import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import Auth from './components/auth/Auth'
import AdminSignUp from './components/auth/AdminSignUp';
import EmpCreation from './components/auth/EmpCreation';
import Email from './components/auth/Password-Reset-Email-Page';
import Flashcards from './components/Flashcards'
import Quiz, { quizLoader } from './components/Quiz'



function App() {
	const [token, setToken] = useState(localStorage.getItem("jwt-token"));
	
	return (
		<>
			{token ? (
				<Layout />
			) : (
				<>
					<Auth setToken={setToken} />
				</>
			)}
			{/* <Routes>
				<Route
				path="/user/login"
				element={<Auth setToken={setToken} />} //pass update component as props
				/>
				<Route path="/signup" element={<AdminSignUp />}/>
				<Route path="/layout" element={<Layout />}/>
				<Route path="/adduser" element={<EmpCreation />}/>
				<Route path="/flashcards" element={<Flashcards />} />
				<Route 
					path="/quiz/:quizParam" 
					loader={quizLoader}
					element={<Quiz />} 
				/>
				<Route path="/adduser" element={<EmpCreation />}/>
				<Route path="/email" element={<Email />}/>
			</Routes> */}
		</>
	)
}

export default App
