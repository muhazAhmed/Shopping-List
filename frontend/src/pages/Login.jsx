import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import svg from "../images/Frozen food-amico.svg"
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Login = () => {
  const [err, setErr] = useState(null)
  const navigate = useNavigate()
  const { login} = useContext(AuthContext)
  const [input, setInputs] = useState({
    email : ""
  })
  const handleChange = (e) => {
    setInputs((prev) => ({...prev,[e.target.name] : e.target.value}))
  }
  const handleSubmit= async (e) => {
    e.preventDefault()
    try {
      await login(input)
      navigate("/dashboard")
    } catch (error) {
      setErr(error.response)
    }
  }
  return (
    <div className="form">
    <img src={svg} alt="svg"/>
      <form> 
        <h1>Login</h1>
        <div className="form-input">
          <input placeholder="Enter your Email" name="email" onChange={handleChange}/>
          <Link to="/dashboard">
            <button onClick={handleSubmit}>Login</button>
          </Link>
          <p>
            New User?
            <Link to="/register" style={{ textDecoration: "none" }}>
              <span>&nbsp;Register</span>
            </Link>
          </p>
        </div>
        {err && <p style={{"color" : "rgb(241, 19, 134)"}}>{err}</p>}
      </form>
    </div>
  );
};

export default Login;
