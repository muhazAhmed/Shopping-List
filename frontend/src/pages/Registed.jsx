import axios from 'axios'
import React, { useState } from 'react'
import { Link, Navigate, useNavigate  } from 'react-router-dom'
import svg from "../images/Frozen food-amico.svg"

const Registed = () => {
  const [err, setErr] = useState(null)
  const [input, setInputs] = useState({
    username : "",
    email : ""
  })

  const navigate = useNavigate()
  const handleChange = (e) => {
    setInputs((prev) => ({...prev,[e.target.name] : e.target.value}))
  }
  const handleSubmit= async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:8800/register", input)
      navigate("/login")
    } catch (error) {
      setErr(error.message)
    }
  }
  return (
    <div className='form'>
    <img src={svg} alt="svg"/>
      <form>
        <h1>Register</h1>
        <div className='form-input'>
        <input placeholder='Enter User Name' name='username' onChange={handleChange}/>
        <input type="email" placeholder='Enter your Email' name='email' onChange={handleChange}/>
        <Link to="/login">
          <button onClick={handleSubmit}>Register</button>
        </Link>
        <p>Aldready registerd?
        <Link to="/login" style={{"textDecoration" : "none"}}><span>&nbsp;Login</span></Link></p>
        </div>
        {err && <p style={{"color" : "rgb(241, 19, 134)"}}>{err}</p>}
      </form>
    </div>
  )
}

export default Registed
