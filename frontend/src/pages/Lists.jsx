import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Lists = () => {
  const [getItem, setGetItem] = useState({});

  const { currentUser, logout } = useContext(AuthContext);
  let id = currentUser.email;

  const handleChange = (e) => {
    setList((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const fetchList = async () => {
    let result = await axios.get(
      `http://localhost:8800/fetchList/?email=${id}`
    );
    setGetItem(result.data);
  };

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="list">
    <div className="logout">
        <Link to="/login">
          <button onClick={logout}>Logout</button>
        </Link>
      </div>
      <div className="lists">
        {Object.entries(getItem).map((items, index) => (
          <div className="carts" key={index}>
          {Object.entries(items[1]).map((c, i) => (
          <div className="cart" key={i}>
            <h3 key={i}>product : {c[1].products}
            </h3>
            <h3>quantity : {c[1].quantity} X 500g</h3>
            <h3>Total price : {c[1].priceTotal}</h3>
          </div>
        ))}
          </div>
        ))}
      </div>
        <div className="total">
          <h3 onChange={handleChange}>Grand Price : {getItem.totalPrice}</h3>
          <h3 onChange={handleChange}>Total Items : {getItem.totalitems}</h3>
        </div>
    </div>
  );
};

export default Lists;
