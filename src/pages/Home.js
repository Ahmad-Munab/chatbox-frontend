import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <nav>
        <Link to="/">
          <img style={{width: "13rem"}} src={require("../images/Chatbox101.PNG")} alt="Chatbox101" />
        </Link>
        <Link to="/app">Opne Chats</Link>
        <Link to={"/register"}>Register</Link>
      </nav>
    </div>
  );
};

export default Home;
