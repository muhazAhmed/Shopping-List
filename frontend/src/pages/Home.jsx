import React, { useContext } from "react";
import { Link } from "react-router-dom";
import waves from "../images/waves.svg"
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
    <div className="home">
     
      <h1> Welcome to <span>Shopping</span> List</h1>

      {currentUser ? (
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <button className="btn-home">Dashboard</button>
        </Link>
      ) : (
        <Link className="link" to="/login">
          <button className="btn-home">Proceed</button>
        </Link>
      )}
    </div>
      <img style={{"marginTop" : "18.3rem"}} src={waves} alt="waves" />
    </>
  );
};

export default Home;
