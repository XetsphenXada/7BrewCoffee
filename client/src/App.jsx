import { useState } from 'react';
import Auth from './components/auth/Auth'
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';




function App() {
	const [token, setToken] = useState(localStorage.getItem("jwt-token"));
	//new password route may need "setToken={setToken}" however it currently does issue a token, so I wasn't sure at the moment
	return (
		<>

			{token ? (
				<>
					<Header />
					<Outlet />
					<Footer />
				</>
			) : (
				<>
					<Auth setToken={setToken} />=
				</>
			)}
			{/* <Routes>
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
		<Route path="/newPassword/:_id" element={<Password />}/>
		<Route path="/recipes" element={<Recipes />}/>
			</Routes> */}

		</>
	)
}

export default App