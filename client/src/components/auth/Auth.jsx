import LogIn from "./Login"


//adding signup and login routes to auth component
function Auth({setToken}) {
    return (
      <div>

        <LogIn setToken={setToken}/>

      </div>
    )
  }
  
  export default Auth