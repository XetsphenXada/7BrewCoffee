import React from 'react'

export default function EmpCreation() {
    
    function employeeCreation(event) {
        event.preventDefault();
        hash(password, 10, async (err, passwordHash) => {
            if (err) {
                console.log(err);
            } else {
                const response = await fetch("http://localhost:3000/signup", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "authorization": localStorage.getItem("jwt-token")
                    },
                    body: JSON.stringify({
                        firstName,
                        middleName,
                        lastName,
                        role,
                        storeLocation,
                        email,
                        password: passwordHash
                    })
                })
                console.log(response);
                //create a variable called body to hold the responses we get from the back end converts the response to json so we can read it
                const body = await response.json();
                if (response.status === 200) {
                    //!token being stored in localstorage and saved as setToken (remove in production build)
                    localStorage.setItem("jwt-token", body.token);
                    setToken(body.token);
                    console.log(body.token);
                } else {
                    console.log(body.message);
                }
            }
        })
        }
        
    
    
    return (
      <div>EmpCreation</div>
    )
}
