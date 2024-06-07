import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import Auth from './components/auth/Auth'
import AdminSignUp from './components/auth/AdminSignUp';
import EmpCreation from './components/auth/EmpCreation';
import Email from './components/auth/Password-Reset-Email-Page';
import Flashcards from './components/Flashcards'
import Quiz from './components/Quiz'
import Password from './components/auth/Password-Reset-Password-Page';
import Recipes from './components/Recipes';


function App() {
	const [token, setToken] = useState(localStorage.getItem("jwt-token"));
	//new password route may need "setToken={setToken}" however it currently does issue a token, so I wasn't sure at the moment
	return (
		<>
		<Routes>
        <Route
          path="/user/login"
          element={<Auth setToken={setToken} />} //pass update component as props
        />
		<Route path="/signup" element={<AdminSignUp />}/>
		<Route path="/adduser" element={<EmpCreation />}/>
		<Route path="/email" element={<Email />}/>
		<Route path="/newPassword/:_id" element={<Password />}/>
		<Route path="/recipes" element={<Recipes />}/>
      	</Routes>
		</>
	)
}

export default App
