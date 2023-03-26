import react, {useState} from 'react'
import "./login.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function UserLogin({reload, setReload}){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  
  function handleSubmit(e){
    const user = {email, password}
    console.log({email, password})
    e.preventDefault()
    fetch(`http://localhost:8001/login`, {
      method: 'POST',
      body: JSON.stringify(user),
       headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then ((data) => {
      setReload(!reload)
      navigate('/contacts')
    })
    .catch((error) => console.error(error));
  }
  return(<>
  <div className="login-container">
        <form className="login-form">
          <h2>Login</h2>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Submit</button>
        </form>
      </div>
  </>)
}

export default UserLogin