// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//import components
import Home from "./page/home"
import Poll from "./page/poll"
import Detail from "./page/detail";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/create-poll" element={<Poll/>} />
          <Route path="/poll" element = {<Detail/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
