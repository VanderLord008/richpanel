import React, { useState } from "react";
import { createUser } from "../api";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCustomerId, setUser, setUserEmail } from "../store/userSlice";
import styles from "./Register.module.css";

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submissionHandler = async (e) => {
    e.preventDefault();
    let newUser = {
      name: name,
      email: email,
      password: password,
    };
    console.log(newUser);
    try {
      const result = await createUser(newUser);
      console.log(result);
      dispatch(setUser(name));
      dispatch(setCustomerId(result.data.data.stripeCustomerId));
      dispatch(setUserEmail(result.data.data.email));
      navigate("/plans");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <div className={styles.heading}>Create Account</div>
        <form>
          <div className={styles.ele1}>
            <p>Name</p>
            <div className={styles.form1}>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="name"
                type="text"
              ></input>
            </div>
          </div>
          <div className={styles.ele2}>
            <p>Email</p>
            <div className={styles.form1}>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
                type="email"
              ></input>
            </div>
          </div>
          <div className={styles.ele3}>
            <p>Password</p>
            <div className={styles.form1}>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="password"
                type="password"
              ></input>
            </div>
          </div>
          <div className={styles.btn}>
            <button type="submit" onClick={submissionHandler}>
              Register
            </button>
          </div>
        </form>
        <div className={styles.written}>
          Already have an account? <span>Login</span>
        </div>
        <button onClick={() => props.change()}>login</button>
      </div>
    </div>
  );
};

export default Register;
