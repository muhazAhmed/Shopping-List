import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const [err, setErr] = useState(null);
  const [item, setItem] = useState({});
  const [getItem, setGetItem] = useState({});

  const [quantitys, setQuantitys] = useState(1);

  const { currentUser } = useContext(AuthContext);
  let username = currentUser.username.toUpperCase();
  let id = currentUser.email;

  //to send data to backend
  const [list, setList] = useState({
    email: currentUser.email,
    items: [
      {
        products: item.name,
        quantity: quantitys,
        priceTotal: "" * quantitys,
      },
    ],
    totalPrice: getItem.totalPrice,
    totalItems: getItem.totalitems,
  });
  const [Items, setItems] = useState({});

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

  useEffect(() => {
    fetchItems();
    fetchList();
  }, []);
  return (
    <div className="dashboard">
      <div className="dropdown">
        <h1>WELCOME BACK {username}</h1>
        <select name="Items" onChange={handleDropDown}>
          <option defaultValue>Select Item</option>
          {Object.entries(item).map((items, index) => (
            <option value={items[1].name} key={index}>
              {items[1].name}
            </option>
          ))}
        </select>
      </div>
      <div className="dash-main">
        <div className="dash-content">
          <h3>Name : {Items.Items}</h3>
          <div>
          <h3 className="qnty">
           Quantity <br/>
            <button onClick={handleIncrease}>+</button>
            <span> &nbsp;{quantitys}&nbsp; </span>
            <button onClick={handleDecrease}>-</button>
          </h3></div>
          <h3>Price : 50</h3>
          <div className="btn-2">
          <button onClick={handleSubmit}>Add to Cart</button></div>
        </div>
        <div className="btn-qnty">
        {err && <p>{err}</p>}
        </div>
        <div className="cart">
          <h3 onChange={handleChange}>Total Price : {getItem.totalPrice}</h3>
          <h3 onChange={handleChange}>Total Items : {getItem.totalitems}</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

//quantity increase decrease button react?
