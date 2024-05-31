import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
// import Flashcards from './components/Flashcards'
import Auth from './components/auth/Auth'
import AdminSignUp from './components/auth/AdminSignUp';
import Layout from './components/testpagelayoutcode';
import EmpCreation from './components/auth/EmpCreation';
import Header from './components/Header';
import Footer from './components/Footer';
import Email from './components/auth/Password-Reset-Email-Page';


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
		<Route path="/header" element={<Header />}/>
		<Route path="/footer" element={<Footer />}/>
		<Route path="/email" element={<Email />}/>
      	</Routes>
		</>
	)
}

export default App
