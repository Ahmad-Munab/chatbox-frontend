import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import ChatApp from './pages/ChatApp';
import Home from './pages/Home';
import './styles/App.css'

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App ">
      <Routes>
        <Route path='/*' element={<Home/>}/>
        <Route path='/app/*' element={<ChatApp/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
