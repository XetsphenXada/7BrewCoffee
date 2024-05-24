import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import Flashcards from './components/Flashcards'
import LogIn from './components/auth/Login'


function App() {
	const [token, setToken] = useState(localStorage.getItem("jwt-token"));
	
	return (
		<>
		<Routes>
        <Route
          path="/login"
          element={<LogIn></LogIn>}
        />
      	</Routes>
		</>
	)
}

export default App
