import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import ChatApp from './pages/ChatApp';
import Home from './pages/Home';
import './styles/App.css'

import { ToastContainer } from "react-toastify";
import CheckAuth from './components/CheckAuth.js';

function App() {
  return (
    <div className="App ">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/app/*' element={<ChatApp/>}/>
        <Route path='/' element={<CheckAuth/>}>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
