import logo from './logo.svg';
import './App.css';

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Main from "./Pages/Main/Main";
import Calendar from './Pages/Calendar/Calendar';
import BoardMain from './Pages/Board/BoardMain/BoardMain';
import BoardPost from './Pages/Board/BoardPost/BoardPost';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/boardmain" element={<BoardMain />} />
          <Route path="/boardpost/:postId" element={<BoardPost/>} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
