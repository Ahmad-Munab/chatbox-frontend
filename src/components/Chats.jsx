import { Link, NavLink, Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getChats } from "../app/chatAPIS";

const Chats = () => {
  const { chats, loadingChats, thisUser } = useSelector((state) => state.default);
  const dispatch = useDispatch();

  useEffect(() => {
    chats === null && dispatch(getChats());
  }, [dispatch, chats]);

  return (
    <div className="d-flex w-100">
      <div className="section-1">
        <h2 className="fw-semibold">Chats</h2>
        <hr className="w-100 bg-black mt-0" />
        <div className="vstack gap-4 overflow-auto hide-scrollbar">
          {loadingChats || !thisUser ? (
            <p className="text-center">Loading...</p>
          ) : chats !== null && chats.length > 0 ? (
            chats.map((chat) => (
              <NavLink
                key={chat._id}
                to={`/app/chats/${chat._id}`}
                className={({ isActive }) => {
                  return "p-3 btn rounded-4 w-100 d-flex justify-content-between align-items-center shadow-sm ";
                }}
                style={({ isActive }) => {
                  return isActive
                    ? { background: "#5B96F7", color: "white" }
                    : { background: "#ffffff" };
                }}
              >
                <img
                className="rounded-circle"
                  style={{ width: "50px", background: "transparent" }}
                  src={chat.users[1].profilePic !== thisUser.profilePic ? chat.users[1].profilePic : chat.users[0].profilePic}
                  alt={chat.users[1].username !== thisUser.username ? chat.users[1].username : chat.users[0].username}
                />
                <div className="vstack gap-1 ms-3 text-start ">
                  <h3 className="m-0">{chat.users[1].username !== thisUser.username ? chat.users[1].username : chat.users[0].username}</h3>
                  <div>Last messaage</div>
                  
                </div>
              </NavLink>
            ))
          ) : (
            <div className="mt-3 d-flex flex-column justify-content-between align-items-center">
                <h6 className="text-primary text-center">Add some friends to began chatting :)</h6>
                <Link to="/app/friends" className="mt-1">Add friends</Link>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Chats;
