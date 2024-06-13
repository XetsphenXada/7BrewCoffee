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
import Email from './components/auth/Password-Reset-Email-Page.jsx'
import Password from './components/auth/Password-Reset-Password-Page.jsx'
import Auth from './components/auth/Auth.jsx'
import ViewAllUsers from './components/auth/ViewAllUsers.jsx'
import EditProileCard from './components/auth/EditProfileCard.jsx'
import Recipes from './components/Recipes.jsx'
import DisplayRecipes from './components/Display-Recipes.jsx'
import PasswordReset from './components/auth/Password- Reset-Rendering.jsx'

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
				path: "/newPassword/:_id",
				element: <Password />
			},
			{
				path: "/allusers",
				element: <ViewAllUsers />
			},
			{
				path: "/addAdmin",
				element: <AdminSignUp />
			},
			{
				path: "/addEmployee",
				element: <EmpCreation />
			},
			{
				path: "/edit",
				element: <EditProileCard />
			},
			{
				path: "/recipes",
				element: <Recipes />
			},
			{
				path: "/allRecipes",
				element: <DisplayRecipes />
			}
		]
	},
	{
		path: "/user",
		element: <PasswordReset />,
		children: [
			{
				path: "/user/email",
				element: <Email />
			},
			{
				path: "/user/newPassword/:_id",
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
			}
		]
	}
]);

// const passwordResetRouter = createBrowserRouter([
// 	{
// 		path:"/",
// 		element: <PasswordReset />,
// 		children: [
// 			{
// 				path: "/email",
// 				element: <Email />
// 			},
// 			{
// 				path: "/newPassword/:_id",
// 				element: <Password />
// 			}
// 		]
// 	}
// ])

ReactDOM.createRoot(document.getElementById('root')).render(

	<React.StrictMode>
		<RouterProvider router={employeeRouter}/>
	</React.StrictMode>

)
