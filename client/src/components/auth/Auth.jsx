import { useState } from "react";
import LogIn from "./Login"


//adding signup and login routes to auth component
function Auth() {
  const [token, setToken] = useState(localStorage.getItem("jwt-token"));
    return (
      <div>

        <LogIn setToken={setToken}/>

      </div>
    )
  }
  
  export default Auth