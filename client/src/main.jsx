import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Flashcards from './components/Flashcards.jsx'
import EmpCreation from './components/auth/EmpCreation.jsx'
import AdminSignUp from './components/auth/AdminSignUp.jsx'
import Quiz, { quizLoader } from './components/Quiz.jsx'
import QuizList, { quizListLoader } from './components/QuizList.jsx'
import Email from './components/auth/Password-Reset-Email-Page.jsx'
import LogIn from './components/auth/Login.jsx'
import Password from './components/auth/Password-Reset-Password-Page.jsx'

// router for when regular employee is logged in
const employeeRouter = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/flashcards",
				element: <Flashcards />
			},
			{
				path: "/quiz",
				element: <QuizList />,
				loader: quizListLoader
			},
			{
				path: "/quiz/:quizParam",
				element: <Quiz />,
				loader: quizLoader
			},
			{
				path: "/email",
				element: <Email />
			},
			{
				path: "/user/login",
				element: <LogIn />
			},
			{
				path: "/newPassword/:_id",
				element: <Password />
			}
		]
	}
]);

// router for when manager/admin is logged in
const adminRouter = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/flashcards",
				element: <Flashcards />
			},
			{
				path: "/adduser",
				element: <EmpCreation />
			},
			{
				path: "/signup",
				element: <AdminSignUp />
			}
		]
	}
]);

ReactDOM.createRoot(document.getElementById('root')).render(

	<React.StrictMode>
		<RouterProvider router={employeeRouter}/>
	</React.StrictMode>,

)
