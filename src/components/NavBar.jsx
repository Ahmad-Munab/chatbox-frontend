import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { TbUsers } from "react-icons/tb";

const NavBar = () => {
  return (
    <>
      <div className="navbar">
        <NavLink
          to="/app"
          className="mb-4"
        ><img style={{width: "64px"}} src={require("../images/Chatbox101.png")} alt="Chatbox101" /></NavLink>
        <NavLink
            to="/app/chats"
            style={({ isActive }) => {
              return (isActive ? {background: "#5B96F7", color: "white"} : {background: "transparent", color: "black"});
            }} 
            className="nav-icons rounded-4"
        ><i className="fa-regular fa-comment-dots fs-2" style={{width: "50px"}} /></NavLink>
        <NavLink
            to="/app/friends"
            style={({ isActive }) => {
              return (isActive ? {background: "#5B96F7", color: "white"} : {background: "transparent", color: "black"});
            }}
            className="nav-icons rounded-4"
        ><TbUsers className="fs-2" style={{width: "50px"}} /></NavLink>
      </div>
      <Outlet/>
      
    </>
  );
};

export default NavBar;
