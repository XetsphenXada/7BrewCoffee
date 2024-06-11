import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Email() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function submitEmail(event) {
    event.preventDefault(); //stop page from refreshing on submit
    //sending username and password to backend
    const response = await fetch("http://localhost:3000/forgotPassword", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const body = await response.json();
    if (response.status === 200) {
      console.log(body);

       //saving jwt to local storage
       localStorage.setItem("jwt-token", body.token);
       setToken(body.token);
      navigate("/login");
      
    } else {
      console.log(body.response);
    }
  }
  return (
    <form 
      name="userEmail"
      onSubmit={submitEmail}
      className="flex flex-col h-max"
    >
      <label className="flex form-control m-auto">
        <span>Please enter email to recieve link to reset password</span>
        <input
          type="text"
          placeholder="Email"
          className=" input input-bordered w-full max-w-xs text-3xl"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <button className="btn btn-wide btn-primary m-3 text-2xl" type="submit">
          Submit
        </button>
      </label>
    </form>
  );
}

export default Email;
