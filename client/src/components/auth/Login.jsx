import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
// import "../../index.css"

export default function LogIn({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  async function submitLogIn(event) {
    event.preventDefault(); //stop page from refreshing on submit
    //sending username and password to backend
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const body = await response.json();
    if (response.status === 200) {
      console.log(body);

      //saving jwt to local storage
      localStorage.setItem("jwt-token", body.token);
      setToken(body.token);
      navigate("/")
    } else {
      console.log(body.response);
    }
  }
  //login page render
  return (
    <div>
    <form
      onSubmit={submitLogIn}
      className="flex flex-col items-center justify-center"
    >
      {/* <div className="flex self-center size-1/3 m-2 md:size-20">
    <figure><img  src="https://scontent-den2-1.xx.fbcdn.net/v/t39.30808-6/247100083_4815187798532861_3976554082664717673_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=-p34XeXkeCsQ7kNvgFv9iVY&_nc_ht=scontent-den2-1.xx&oh=00_AYDFueaA-eAPxUfnTLOgbn3Gyth36lk06kAfxZnXt5vsJg&oe=665586B9" alt="7 Brew Coffee Logo" /></figure>
  </div> */}
        {/* <a className="text-3xl m-3">7 Brew Coffee</a> */}
      <h1 className="text-4xl m-3">Log In</h1>
      <label className="form-control w-full max-w-xs">
        <span className="text-3xl m-4">Email:</span>
        <input
          type="text"
          placeholder="Email"
          className=" input input-bordered w-full max-w-xs text-3xl"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </label>
      <label className="form-control w-full max-w-xs">
        <span className="text-3xl m-4">Password:</span>
        <input
          placeholder="Password"
          type={visible ? "text" : "password"}
          className=" input input-bordered w-full max-w-xs"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <div onClick={() => setVisible(!visible)}>
          {
            visible ? <EyeOutlined/> : <EyeInvisibleOutlined/>
          }
        </div>
      </label>
      {/* <p className="m-4 text-2xl justify-center">Forgot your password?</p>  */}
      <button className="btn btn-secondary text-white text-2xl m-4"><a href="http://localhost:5173/email">Forgot your password?</a></button>
      <button className="btn btn-wide btn-primary m-3 text-2xl" type="submit">
        Submit
      </button>
    </form>
    <div className="flex card card-side bg-secondary fixed bottom-0 md:w-screen">
  <figure className="flex size-1/3 m-2 md:size-28"><img src="https://scontent-den2-1.xx.fbcdn.net/v/t39.30808-6/247100083_4815187798532861_3976554082664717673_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=-p34XeXkeCsQ7kNvgFv9iVY&_nc_ht=scontent-den2-1.xx&oh=00_AYDFueaA-eAPxUfnTLOgbn3Gyth36lk06kAfxZnXt5vsJg&oe=665586B9" alt="7 Brew Logo"/></figure>
</div>
    </div>
  );
}
