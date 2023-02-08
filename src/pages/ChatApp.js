import { Route, Routes } from "react-router-dom";
import Chats from "../components/Chats";
import Friends from "../components/Friends";
import NavBar from "../components/NavBar";
import PrivetChat from "../components/PrivetChat";
import RequireAuth from "../components/RequireAuth";

const ChatApp = () => {
  return (
    <div className="app d-flex">
      <Routes>
        <Route element={<RequireAuth/>}>
          <Route path="/" element={<NavBar/>}>
            <Route path="/friends" element={<Friends/>}/>
            <Route path="/chats" element={<Chats/>}>
                <Route path="/chats/:name" element={<PrivetChat/>}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default ChatApp;
