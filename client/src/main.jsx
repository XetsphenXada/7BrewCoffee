import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Flashcards from './components/Flashcards.jsx'
import EmpCreation from './components/auth/EmpCreation.jsx'
import AdminSignUp from './components/auth/AdminSignUp.jsx'
import Quiz, { quizLoader } from './components/Quiz.jsx'
import QuizList, { quizListLoader } from './components/QuizList.jsx'

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
