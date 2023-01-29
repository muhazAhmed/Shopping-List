import React from 'react'
import { Link } from "react-router-dom";
import svg from "../images/404 Error-rafiki.svg"

const PageNotFoud = () => {
  return (
    <div className='errorPage'>
      <img src={svg} alt="svg"/>
      <Link to="/">
        <button>Home</button>
      </Link>
    </div>
  )
}

export default PageNotFoud
