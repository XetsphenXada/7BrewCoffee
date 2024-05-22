import Flashcards from './components/Flashcards'

function App() {
	const [token, setToken] = useState(localStorage.getItem("jwt-token"));
	
	return (
		<>
			<Flashcards />
		</>
	)
}

export default App
