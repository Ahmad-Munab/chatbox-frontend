import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../app/userAPIS";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SearchUser = () => {
  const { users, loadingUsers } = useSelector((state) => state.default);
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');

  function handleSubmition(e) {
    e.preventDefault();
    if (!username) {
      toast.warning("Please enter a username");
      return;
    }
    dispatch(getUsers(username));
  }

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <form onSubmit={handleSubmition}>
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
        <button type="submit" className="btn btn-primary btn-block">
          Search
        </button>
      </form>
      {loadingUsers ? (
        "Loading..."
      ) : (
        <ol>
          {users.map((user) => (
            <li key={user._id}>{user.username}</li>
          ))}
        </ol>
      )}
      <ToastContainer />
    </>
  );
};

export default SearchUser;
