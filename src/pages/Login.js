import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../app/userAPIS";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Auth.model.css";

const Login = () => {
  const { loginUserSuccess } = useSelector((state) => state.default);
  const dispatch = useDispatch();


  const [show, setShow] = useState(false);
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmition(e) {
    e.preventDefault();
    if (!handle || !password) {
      toast.warning("All fields are required!");
      return;
    }
    dispatch(loginUser("@"+handle.toLowerCase(), password));
  }

  useEffect(() => {
      if (loginUserSuccess && loginUserSuccess !== null) {
        setTimeout(() => window.location.href = "/app/chats", 1000)
      }
  },[loginUserSuccess])

  return (
    <>
      <div className="auth-container rounded-4 shadow">
        <form onSubmit={handleSubmition} className="vstack gap-3">
          <h1 className="text-center">Sign In</h1>
          <div className="form-floating">
          <div className="input-group">
            <span class="input-group-text fw-semibold" id="basic-addon1">
               @
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Handle"
              aria-describedby="basic-addon1"
              onChange={(e) => setHandle(e.target.value)}
            />
          </div>
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
            {show ? (
              <BiHide
                className="show-hide-icon"
                onClick={() => setShow(false)}
                cursor="pointer"
              />
            ) : (
              <BiShow
                className="show-hide-icon"
                onClick={() => setShow(true)}
                cursor="pointer"
              />
            )}
            <label for="password" className="form-label">
              Password
            </label>
          </div>
          <div className="form-group text-center">
            <button type="submit" className="btn btn-primary btn-block">
              Sign in
            </button>
            <p className="mt-1">
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
