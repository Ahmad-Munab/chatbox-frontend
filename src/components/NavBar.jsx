import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { TbUsers } from "react-icons/tb";
import { useSelector } from "react-redux";

const NavBar = () => {
  function logout() {
    localStorage.removeItem("jwt");
    window.location.href = "/login"
  }

  const { thisUser } = useSelector((state) => state.default);
  return (
    <>
      <div className="navbar">
        <div className="navbar-top">
        <NavLink to="/app" className="mb-4">
            <img
              style={{ width: "64px" }}
              src={require("../images/Chatbox101.PNG")}
              alt="Chatbox101"
            />
          </NavLink>
          <NavLink
            to="/app/chats"
            style={({ isActive }) => {
              return isActive
                ? { background: "#5B96F6", color: "white" }
                : { background: "transparent", color: "black" };
            }}
            className="nav-icons rounded-4"
          >
            <i
              className="fa-regular fa-comment-dots fs-2"
              style={{ width: "50px" }}
            />
          </NavLink>
          <NavLink
            to="/app/friends"
            style={({ isActive }) => {
              return isActive
                ? { background: "#5B96F7", color: "white" }
                : { background: "transparent", color: "black" };
            }}
            className="nav-icons rounded-4"
          >
            <TbUsers className="fs-2" style={{ width: "50px" }} />
          </NavLink>
        </div>
        {thisUser ? (
          <div className="navbar-bottom mt-auto vstack gap-5 text-center">
            <i
              className="fa-solid fa-arrow-right-from-bracket fs-2 btn hover-shadow-sm"
              data-bs-toggle="modal"
              data-bs-target="#logout-modal"
              
            />
            <div className="modal fade" tabIndex="-1" id="logout-modal">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <h2 className="">Want to logout?</h2>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Never mind
                    </button>
                    <button type="button" className="btn btn-danger" onClick={logout}>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <img
              src={thisUser.profilePic}
              alt="Go to Profile"
              className="btn rounded-circle shadow-md border-2 border-dark p-0 mx-auto"
              style={{ width: "75px" }}
            />
          </div>
        ) : (
          "Loading..."
        )}
      </div>
      <Outlet />
    </>
  );
};

export default NavBar;
