import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/Notes/noteState';
import Alert from './components/Aleart';
import Login from './components/Login';
import Signup from './components/signup';
import Profile from './components/Profile'
import { useState } from 'react';

function App() {

  const [ alert, setalert] = useState(null)
  const showAlert = (message, type) =>{
    setalert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setalert(null)
    }, 3000);
  }
  return (
    <>
    <NoteState>
    <Router>
        <Navbar />
        <Alert alert={alert }/>
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert} />} />
          <Route path="/about" element={<About/>} />
          <Route path='/Login' element={<Login showAlert={showAlert} />}/>
          <Route path='/Signup' element={<Signup showAlert={showAlert} />}/>
          <Route path='/Profile' element={<Profile/>}/>
          {/* Add other routes here as needed */}
        </Routes>
      </Router>
    </NoteState>
     
    </>
  );
}

export default App;
