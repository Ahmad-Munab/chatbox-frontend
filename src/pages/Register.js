import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../app/userAPIS";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDropzone } from "react-dropzone";

import "../styles/Auth.model.css";


const Register = () => {
  const { loginUserSuccess } = useSelector((state) => state.default);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
  });

  function handleSubmition(e) {
    e.preventDefault();
    if (!username || !handle || !password) {
      toast.warning("All fields are required!");
      return;
    } else if (password.length < 8) {
      toast.error("Password must be 8 character or more");
      return;
    }
    dispatch(registerUser(username, "@"+handle.toLowerCase(), password, acceptedFiles[0]));
  }

  useEffect(() => {
    if (loginUserSuccess && loginUserSuccess !== null) {
      setTimeout(() => window.location.href = "/app/chats", 100)
    }
  },[loginUserSuccess])

  return (
    <>
      <div className="auth-container rounded-4 shadow">
        <form onSubmit={handleSubmition} className="vstack gap-3">
          <h1 className="text-center">Sign Up</h1>
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
              Display Username
            </label>
          </div>
          <div className="input-group">
            <span class="input-group-text fw-semibold" id="basic-addon1">
               @
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Handle (Unique Name)"
              aria-describedby="basic-addon1"
              onChange={(e) => setHandle(e.target.value)}
            />
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
          <div className="text-center">
            {acceptedFiles.length >= 1 ? (
              <img
                src={URL.createObjectURL(acceptedFiles[0])}
                alt={acceptedFiles[0].path}
                className="border border-1 rounded-3 p-2"
                style={{ width: "400px" }}
              />
            ) : (
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p className="border border-1 rounded-3 p-2">
                  Select Profile Pic{" "}
                  <em>(Optional)</em>
                </p>
              </div>
            )}
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-block">
              Sign Up
            </button>
            <p className="mt-1">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </form>
      </div>
      
    </>
  );
};

export default Register;
