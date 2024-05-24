import { useState } from 'react';
import Flashcards from './components/Flashcards'
import AdminSignUp from './components/auth/AdminSignUp';

function App() {
	const [token, setToken] = useState(localStorage.getItem("jwt-token"));
	
	return (
		<>
			{/* <Flashcards /> */}
			<AdminSignUp setToken={ setToken } />
		</>
	)
}

export default App
