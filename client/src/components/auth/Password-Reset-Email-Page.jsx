import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

function Email() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function submitEmail(event) {
    event.preventDefault(); //stop page from refreshing on submit
    //sending username and password to backend
    const response = await fetch("http://localhost:3000/forgotEmail", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email
      }),
    });

    const body = await response.json();
    if (response.status === 200) {
      console.log(body);

      navigate("/login");
      
    } else {
      console.log(body.response);
    }
  }
  return (
    <form
      name="userEmail"
      onSubmit={submitEmail}
      className="flex flex-col items-center"
    >
      <Header></Header>
      <label className="flex form-control items-center justify-center">
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
      <Footer></Footer>
    </form>
  );
}

export default Email;
