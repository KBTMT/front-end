import logo from './logo.svg';
import './App.css';

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Main from "./Pages/Main/Main";
import Calendar from './Pages/Calendar/Calendar';
import BoardMain from './Pages/Board/BoardMain/BoardMain';
import BoardPost from './Pages/Board/BoardPost/BoardPost';
import BoardWrite from './Pages/Board/BoardWrite/BoardWrite';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/board" element={<BoardMain />} />
          <Route path="/board/register" element={<BoardWrite />} />
          <Route path="/board/detail/:boardSeq" element={<BoardPost p/>} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
