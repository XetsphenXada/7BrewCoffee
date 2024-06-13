import roundlogo from '../images/sevenBrew_Secondary.png'

function Footer() {
    return (
		<div className="flex bg-secondary sticky z-10 bottom-0 md:w-screen">
			<figure className="flex size-1/3 m-2 md:size-28"><img src={roundlogo} alt="7 Brew Logo"/></figure>
			<div className="flex card-body">
				<h2 className="card-title flex justify-end text-accent">info@7Brew.com</h2>
				<p className="card-title flex justify-end text-accent">479-358-9274</p>
			</div>
		</div>
    )
}
    
export default Footer