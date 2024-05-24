import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "../../index.css"

export default function LogIn({ setToken }) {
  const [email, setEmail] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const navigate = useNavigate();

  async function submitLogIn(event) {
    event.preventDefault();
    //sending username and password to backend
    const response = await fetch("http://localhost:4000/user/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        passwordHash,
      }),
    });

    const body = await response.json();
    if (response.status === 200) {
      console.log(body);

      //saving jwt to local storage
      localStorage.setItem("jwt-token", body.token);
      setToken(body.token);
      // navigate("/placeholder")
    } else {
      console.log(body.response);
    }
  }
  //login page render
  return (
    <form
      onSubmit={submitLogIn}
      className="flex flex-col items-center justify-center"
    >
      <div className="flex self-center size-1/3 m-2">
    <figure><img  src="https://scontent-den2-1.xx.fbcdn.net/v/t39.30808-6/247100083_4815187798532861_3976554082664717673_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=-p34XeXkeCsQ7kNvgFv9iVY&_nc_ht=scontent-den2-1.xx&oh=00_AYDFueaA-eAPxUfnTLOgbn3Gyth36lk06kAfxZnXt5vsJg&oe=665586B9" alt="7 Brew Coffee Logo" /></figure>
  </div>
      <div className="navbar-center">
        <a className="text-3xl m-3">7 Brew Coffee</a>
      </div>
      <h1 className="text-4xl m-3">Log In</h1>
      <label className="form-control w-full max-w-xs">
        <span className="text-3xl m-4">Email:</span>
        <input
          type="text"
          placeholder="Email"
          className=" input input-bordered w-full max-w-xs"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </label>
      <label className="form-control w-full max-w-xs">
        <span className="text-3xl m-4">Password:</span>
        <input
          placeholder="Password"
          type="password"
          className=" input input-bordered w-full max-w-xs"
          onChange={(e) => setPasswordHash(e.target.value)}
        ></input>
      </label>
      <p className="m-4">Forgot your password? <button className="btn btn-secondary text-white">Click Here</button></p>
      <button className="btn btn-wide btn-primary m-3" type="submit">
        Submit
      </button>
      <div className="flex card card-side bg-secondary shadow-xl fixed bottom-0">
  <figure className="flex size-1/3 m-2"><img src="https://scontent-den2-1.xx.fbcdn.net/v/t39.30808-6/247100083_4815187798532861_3976554082664717673_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=-p34XeXkeCsQ7kNvgFv9iVY&_nc_ht=scontent-den2-1.xx&oh=00_AYDFueaA-eAPxUfnTLOgbn3Gyth36lk06kAfxZnXt5vsJg&oe=665586B9" alt="7 Brew Logo"/></figure>
  <div className="flex card-body">
    <h2 className="card-title flex justify-end text-white">info@7Brew.com</h2>
    <p className="card-title flex justify-end text-white">479-358-9274</p>
  </div>
</div>
    </form>
  );
}
