import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import { hash } from "bcryptjs";
import { useParams } from "react-router-dom";
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

export default function Password() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  let { _id } = useParams();

  async function submitPassword(event) {
    event.preventDefault(); //stop page from refreshing on submit
    //sending username and password to backend

    // hash(password, 10, async (err, passwordHash) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    console.log("test", _id);
    const response = await fetch(`http://localhost:3000/resetPassword/${_id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        password: password,
        confirmPassword: confirmPassword
      })
    });
    console.log("test3", response);
    const body = await response.json();
    if (response.status === 200) {
      console.log("test2", body);

    //   //saving jwt to local storage
    //   localStorage.setItem("jwt-token", body.token);
    //   setToken(body.token);
      navigate("/user/login", {replace: true});
    } else {
      console.log("test4", body.response);
    }
  }
    //   });
    // }
  return (
    <div>
        {/* <Header></Header> */}
    <form
      name="userPassword"
      onSubmit={submitPassword}
      className="flex flex-col items-center"
    >
      <label className="flex form-control items-center justify-center">
        <span>Please enter new password to reset password</span>
        <input
          name="new password"
          type={visible ? "text" : "password"}
          placeholder="New Password"
          className=" input input-bordered w-full max-w-xs text-3xl"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          name="confirm password"
          type={visible ? "text" : "password"}
          placeholder="Re-enter New Password"
          className=" input input-bordered w-full max-w-xs text-2xl"
          onChange={(e) => setconfirmPassword(e.target.value)}
        ></input>
        <div onClick={() => setVisible(!visible)}>
          {
            visible ? <EyeOutlined/> : <EyeInvisibleOutlined/>
          }
        </div>
        <button className="btn btn-wide btn-primary m-3 text-2xl" type="submit">
          Submit
        </button>
      </label>
      </form>
      {/* <Footer></Footer> */}
    </div>
  );
}
