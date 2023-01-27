import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import ChatApp from './pages/ChatApp';
import Home from './pages/Home';

function App() {
  return (
    <div className="App h-screen w-screen">
      <Routes>
        <Route path='/*' element={<Home/>}/>
        <Route path='/app' element={<ChatApp/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
