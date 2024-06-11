import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'



function App() {
	const [token, setToken] = useState(localStorage.getItem("jwt-token"));
	
	return (
		<>

		</>
	)
}

export default App
