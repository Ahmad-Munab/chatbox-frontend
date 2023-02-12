import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../app/userAPIS";
import { addFriend } from "../app/friendAPIS";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SearchUser = () => {
  const { users, loadingUsers, friends, thisUser } = useSelector(
    (state) => state.default
  );
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");

  function handleSubmition(e) {
    e.preventDefault();
    if (!username) {
      toast.warning("Please enter a username");

      return;
    }
    dispatch(getUsers(username));
  }

  function handleAddingFriend(_id) {
    dispatch(addFriend(_id));
  }

  useEffect(() => {
    users === null && dispatch(getUsers());
  }, [dispatch, users]);

  return (
    <>
      <i
        className="fa-regular fa-plus btn plus-icon thin-blue"
        data-bs-toggle="modal"
        data-bs-target="#modal"
      />
      <div className="modal fade" id="modal">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="mt-3 fw-semibold">Search for users</h3>
              <button className="btn-close fs-5 " data-bs-dismiss="modal" />
            </div>
            <div className="modal-body" id="search-model">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control rounded-5 username-input"
                  name="username"
                  id="username"
                  placeholder="Username"
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value.toLowerCase())}
                />
                <label
                  htmlFor="username"
                  className="form-label username-input-label"
                >
                  Username
                </label>
                <i
                  className="searchIcon fa-solid fa-magnifying-glass btn"
                  onClick={handleSubmition}
                />
              </div>
              {loadingUsers ? (
                <p className="m-3 fw-semibold">Loading...</p>
              ) : (
                <div className="vstack gap-2 mt-3">
                  {users !== null && thisUser &&
                    users.length > 0 &&
                    users
                      .filter(
                        (user) =>
                          user.username.toLowerCase().includes(username) ||
                          user.handle.toLowerCase().includes(username)
                      )
                      .filter((user) => user.handle !== thisUser.handle)
                      .map((user) => (
                        <div
                          key={user._id}
                          className="d-flex justify-content-start m-2 p-3 gap-3 border rounded-3"
                        >
                          <img
                            src={user.profilePic}
                            alt={user.username}
                            style={{ width: "50px" }}
                            className="rounded-circle"
                          />
                          <h5>{user.username}</h5>
                          <p>{user.handle}</p>
                          {friends.some(
                            (friend) => friend["handle"] === user.handle
                          ) ? (
                            <i className="fa-solid fa-circle-check fs-2 text-center ms-auto"></i>
                          ) : (
                            <i
                              className={`fa-regular fa-square-plus my-auto ms-auto me-2 fs-2 btn`}
                              onClick={() => handleAddingFriend(user._id)}
                            ></i>
                          )}
                        </div>
                      ))}
                  {(users === null ||
                    users.filter(
                      (user) =>
                        user.username.toLowerCase().includes(username) ||
                        user.handle.toLowerCase().includes(username)
                    ).length < 1) &&
                    `No user named ${username}`}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchUser;
