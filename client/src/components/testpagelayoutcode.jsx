//adding signup and login routes to auth component

import { Outlet } from "react-router-dom"
import LogOut from "./auth/LogOut"


function Layout() {
	return (
		<form>
			<div className="flex card card-side bg-primary sticky top-0 md:w-screen">
				<figure className="flex size-0 m-2 md:size-28">
					<img src="https://scontent-den2-1.xx.fbcdn.net/v/t39.30808-6/247100083_4815187798532861_3976554082664717673_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=-p34XeXkeCsQ7kNvgFv9iVY&_nc_ht=scontent-den2-1.xx&oh=00_AYDFueaA-eAPxUfnTLOgbn3Gyth36lk06kAfxZnXt5vsJg&oe=665586B9" alt="7 Brew Logo"/>
				</figure>
				<div className="flex card-body">
					<div className="navbar bg-primary">
						<div className="navbar-start">
						</div>
						<div className="navbar-end bg-primary lg:flex">
							<ul className="menu menu-horizontal text-white text-xl px-1">
							<li><a>Daily News</a></li>
							<li><a>Study</a></li>
							<li><a>Testing</a></li>
							</ul>
						</div>
						<div className="flex-none">
							<button className="btn btn-square btn-white dropdown-content">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
							</button>
							<LogOut></LogOut>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col m-9 items-center">
				<Outlet />
			</div>
			<div className="flex card card-side bg-secondary fixed bottom-0 md:w-screen">
				<figure className="flex size-1/3 m-2 md:size-28">
					<img src="https://scontent-den2-1.xx.fbcdn.net/v/t39.30808-6/247100083_4815187798532861_3976554082664717673_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=-p34XeXkeCsQ7kNvgFv9iVY&_nc_ht=scontent-den2-1.xx&oh=00_AYDFueaA-eAPxUfnTLOgbn3Gyth36lk06kAfxZnXt5vsJg&oe=665586B9" alt="7 Brew Logo"/>
				</figure>
				<div className="flex card-body">
					<h2 className="card-title flex justify-end text-white">info@7Brew.com</h2>
					<p className="card-title flex justify-end text-white">479-358-9274</p>
				</div>
			</div>
		</form>
	)
}

export default Layout