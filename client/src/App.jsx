import { Route, Routes } from 'react-router-dom'
// import Flashcards from './components/Flashcards'
// import LogIn from './components/auth/Login'
import Auth from './components/auth/Auth'
import { useState } from 'react';

function App() {

  const [token, setToken] = useState(localStorage.getItem("jwt-token"));

	return (
		<>
			<Routes>
        <Route
          path="/user/login"
          element={<Auth setToken={setToken} />} //pass update component as props
        />
      </Routes>
		</>
	)
}

export default App
