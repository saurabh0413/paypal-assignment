import React from "react";
import { useState } from "react";
import styles from "./Signup.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const initdata = {
  name: "",
  email: "",
  password: "",
};
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initdata);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const submiForm = (e) => {
    console.log(formData);
    e.preventDefault();
    axios
      .post("http://localhost:8585", { ...formData })
      .then((res) => {
        console.log("signup done", res.data);
      
        navigate("/tasks");
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div>
      <div id={styles.formS}>
        <h2>Welcome !</h2>
        <h1>Singup up to</h1>
        <form action="">
          <label htmlFor="name">User name</label>
          <br />
          <input
            type="text"
            id="name"
            value={formData.name}
            name="name"
            onChange={handleChange}
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
          />
          <br />

          <label htmlFor="pass">Password</label>
          <br />
          <input
            type="password"
            id="pass"
            value={formData.password}
            name="password"
            onChange={handleChange}
          />
          <br />

          <input type="submit" onClick={submiForm} />
          <br />
        </form>
      </div>
    </div>
  );
};

export default Signup;
