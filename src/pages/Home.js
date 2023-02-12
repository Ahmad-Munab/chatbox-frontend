import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <nav className="home-nav">
        <Link to="/">
          <img style={{width: "64px"}} src={require("../images/Chatbox101.png")} alt="Chatox101" />
        </Link>
        <div className="home-nav-items">
          <Link to="/app/chats">Open Chats</Link>
          <Link to={"/register"}>Register</Link>
        </div>
      </nav>
    </div>
  );
};

export default Home;
