import { useState } from "react";
import LogIn from "./Login"
// import Email from "./Password-Reset-Email-Page";
// import Password from "./Password-Reset-Password-Page";


//adding signup and login routes to auth component
function Auth() {
  const [token, setToken] = useState(localStorage.getItem("jwt-token"));
    return (
      <div>
        
        <LogIn path='/' setToken={setToken} />
        {/* <Email path='/email' />
        <Password path='/newPassword/:_id' /> */}

      </div>
    )
  }
  
  export default Auth