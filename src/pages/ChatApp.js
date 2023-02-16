import { Route, Routes } from "react-router-dom";
import Chats from "../components/Chats";
import Friends from "../components/Friends";
import NavBar from "../components/NavBar";
import PrivetChat from "../components/PrivetChat";
import RequireAuth from "../components/RequireAuth";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserData } from "../app/userAPIS";

import io from "socket.io-client"
const API_BASE = process.env.REACT_APP_API_BASE

const socket = io.connect(API_BASE)

const ChatApp = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData())
  },[dispatch])
  
  return (
    <div className="app d-flex">
      <Routes>
        <Route element={<RequireAuth/>}>
          <Route path="/" element={<NavBar/>}>
            <Route path="/friends" element={<Friends/>}/>
            <Route path="/chats" element={<Chats/>}>
                <Route path="/chats/:chatId" element={<PrivetChat socket={socket}/>}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default ChatApp;
