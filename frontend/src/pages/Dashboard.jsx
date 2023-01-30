import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Lists from "./Lists";

const Dashboard = () => {
  const [err, setErr] = useState(null);
  const [item, setItem] = useState({});
  const [getItem, setGetItem] = useState({});
  const [Items, setItems] = useState({});

  const [quantitys, setQuantitys] = useState(1);

  const { currentUser, logout } = useContext(AuthContext);
  let username = currentUser.username.toUpperCase();
  let id = currentUser.email;

  //to send data to backend
  const [list, setList] = useState({
    email: currentUser.email,
    items: [
      {
        products: "",
        quantity: quantitys,
      },
    ],
    // totalPrice: getItem.totalPrice,
    // totalItems: getItem.totalitems,
  });
  // console.log(list);
  const handleDropDown = (e) => {
    setItems((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fetchList = async () => {
    let result = await axios.get(
      `http://localhost:8800/fetchList/?email=${id}`
    );
    setGetItem(result.data);
  };

  const fetchItems = async () => {
    let result = await axios.get("http://localhost:8800/dropDownList");
    setItem(result.data);
  };
  const handleChange = (e) => {
    setList((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/updateList", list);
    } catch (error) {
      setErr(error.response.data);
    }
  };

  const handleIncrease = async () => {
    if (quantitys < 6) {
      setQuantitys(quantitys + 1);
    } else {
      alert("You have reached the maximum");
    }
  };
  const handleDecrease = () => {
    if (quantitys > 1) {
      setQuantitys(quantitys - 1);
    } else {
      alert("Quantity cannot be less than 1");
    }
  };

  // const handleCombine = () => {
  //   handleChange()
  //   handleDropDown()
  // }

  useEffect(() => {
    fetchItems();
    fetchList();
  }, []);
  return (
    <div className="dashboard">
      <div className="logout">
        <Link to="/login">
          <button onClick={logout}>Logout</button>
        </Link>
      </div>
      <div className="dropdown">
        <h1>WELCOME BACK {username}</h1>
        <select name="name" onChange={handleDropDown}>
          <option defaultValue>Select Item</option>
          {Object.entries(item).map((items, index) => (
            <option value={items[1].name} key={index} onChange={handleChange}>
              {items[1].name}
            </option>
          ))}
        </select>
      </div>
      <div className="dash-main">
        <div className="dash-content">
          <h3 onChange={handleChange}>Name : {Items.name}</h3>

          <h3 className="qnty">
            Quantity :&nbsp;
            <div style={{ display: "flex", flexDirection: "column" }}>
              {Object.entries(item).map((items, index) => (
                <p value={items[1].cost} key={index}>
                  {Items.Items == items[1].name ? items[1].unit : null}
                </p>
              ))}
              <br />

              <div
                style={{
                  position: "absolute",
                  bottom: "20rem",
                  left: "45.8rem",
                }}
              >
                <button onClick={handleDecrease}>-</button>
                <span onChange={handleChange}> &nbsp;{quantitys}&nbsp; </span>
                <button onClick={handleIncrease}>+</button>
              </div>
            </div>
          </h3>

          <h3 className="qnty" style={{ marginTop: "2rem" }}>
            Price :
            {Object.entries(item).map((items, index) => (
              <p value={items[1].cost} key={index}>
                &nbsp;
                {Items.name == items[1].name ? items[1].cost : null}
              </p>
            ))}
          </h3>
          <div className="btn-2">
            <button onClick={handleSubmit}>Add to List</button>
          </div>
        </div>
      </div>
      <div className="error">{err && <p>{err}</p>}</div>
      <div className="list-btn">
        <Link to="/lists">
          <button>View List</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
//send value of useState counter to backend in mern?
