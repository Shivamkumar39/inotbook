import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/Notes/noteState';
import Alert from './components/Aleart';

function App() {
  return (
    <>
    <NoteState>
    <Router>
        <Navbar />
        <Alert message='this is amazing site'/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About/>} />
          
          {/* Add other routes here as needed */}
        </Routes>
      </Router>
    </NoteState>
     
    </>
  );
}

export default App;
