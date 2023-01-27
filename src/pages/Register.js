import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../app/userAPIS";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const {  } = useSelector(
    (state) => state.default
  );
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmition(e) {
    e.preventDefault()
    if (!username || !password) {
        toast.warning("All fields are required!")
        return
    } else if (password.length < 8) {
        toast.error("Password must be 8 character or more")
        return
    } 
    dispatch(registerUser(username, password))
  }

  return (
    <>
      <form onSubmit={handleSubmition}>
        <h1>Sign Up</h1>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            name="username"
            id="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label for="username" className="form-label">
            Username
          </label>
        </div>
        <div className="form-floating">
          <input
            type={show ? "text" : "password"}
            className="form-control"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="btn show-hide-icon"
            onClick={() => setShow(!show)}
          >
            {show ? <BiHide /> : <BiShow />}
          </button>
          <label for="password" className="form-label">
            Password
          </label>
        </div>
        <div className='form-group text-center'>
          <button type="submit" className='btn btn-primary btn-block'>Sign Up</button>
          <p>Already have an account? <Link to="/login">Sign In</Link></p>
        </div>
      </form>
      <ToastContainer/>
    </>
  );
};

export default Register;
