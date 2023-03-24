import axios from "axios";
import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");

  const submiForm = (e) => {
    e.preventDefault();
    const data = {
      email: username,
      password: pass,
    };
    if (username && pass) {
      axios
        .post("http://localhost:8585/login", { ...data })
        .then((res) => {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          navigate("/sprints");
        })
        .catch((err) => {
          console.log(err, "error while login");
        });
    }
    // if (ans.length == 0) {
    //   alert("please singup before login");
    // } else {
    //   localStorage.setItem("current", JSON.stringify(ans[0]));
    //   navigate("/tasks");
    // }
  };

  return (
    <div>
      <div id={styles.formS}>
        <h2>Welcome !</h2>
        <h1>Login up to</h1>
        <form action="">
          <label htmlFor="username">User name</label>
          <br />
          <input
            type="text"
            id="username"
            value={username}
            name="email"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <br />

          <label htmlFor="pass">Password</label>
          <br />
          <input
            type="password"
            id="pass"
            value={pass}
            name="password"
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
          <br />

          <input type="submit" onClick={submiForm} />
          <br />
        </form>
      </div>
    </div>
  );
};

export default Login;
