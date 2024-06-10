import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
// import Flashcards from './components/Flashcards'
import Auth from './components/auth/Auth'
import AdminSignUp from './components/auth/AdminSignUp';
import Layout from './components/testpagelayoutcode';
import EmpCreation from './components/auth/EmpCreation';
import ViewAllUsers from './components/auth/ViewAllUsers';
import EditProfileCard from './components/auth/EditProfileCard';


function App() {
	const [token, setToken] = useState(localStorage.getItem("jwt-token"));
	
	return (
		<>
		<Routes>
        <Route
          path="/user/login"
          element={<Auth setToken={setToken} />} //pass update component as props
        />
		<Route path="/addAdmin" element={<AdminSignUp />}/>
    	<Route path="/layout" element={<Layout />}/>
		<Route path="/addEmployee" element={<EmpCreation />}/>
		<Route path="/allusers" element={<ViewAllUsers />}/>
		<Route path="/edit/:_id" element={<EditProfileCard />}/>
      	</Routes>
		</>
	)
}

export default App
