import { useState } from "react";

const log = require('console-log-level')({
   prefix: function (level) {
      return new Date().toISOString()
   },
   level: 'info'
})



const Login = () => {
   const [name, setName] = useState("");
   const [loggedIn, setLoggedIn] = useState("")

   const handleSubmit = async ev => {
      ev.preventDefault();
      await fetch('./backend/log_credentials', {
         method: 'POST', body: JSON.stringify(name),
         headers: { 'Content-Type': 'application/json' }
      });
      log.info(`logged in user ${name}`);
      setLoggedIn(true);
      window.location.href = '/'
   }

   return (
      <div className="login">
         <form onSubmit={handleSubmit} method='post'>
            <label className="form-label">Name: </label>
            <br />
            <input className="form-text" type="username"
               id="username"
               name="username"
               value={name}
               onChange={(e) => setName(e.target.value)} ></input>
            <div>
               <button className="btn btn-primary btn-sm" type="submit">Login</button>
            </div>
         </form>
         <p style={{ display: loggedIn ? "" : "None", color: 'green' }}>Successfully logged in!</p>
      </div>
   )
}

export default Login;