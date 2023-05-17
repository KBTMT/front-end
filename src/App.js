import logo from './logo.svg';
import './App.css';


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Pages/Login/Login';
import RegisterBusiness from './Pages/Register/RegisterBusiness/RegisterBusiness';
import RegisterGeneral from './Pages/Register/RegisterGeneral/RegisterGeneral';
import AccountBook from './Pages/AccountBook/AccountBook';
import Financialnews from './Pages/Financialnews/Financialnews'
import Mypage from './Pages/Mypage/MyFinancial/MyFinancial'
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Main from "./Pages/Main/Main";
import Calendar from './Pages/Calendar/Calendar';
import BoardMain from './Pages/Board/BoardMain/BoardMain';
import BoardPost from './Pages/Board/BoardPost/BoardPost';
import BoardWrite from './Pages/Board/BoardWrite/BoardWrite';
import FindId from './Pages/Find/FindId/FindId';
import FindPassword from './Pages/Find/FindPassword/FindPassword';

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/board" element={<BoardMain />} />
          <Route path="/board/register" element={<BoardWrite />} />
          <Route path="/board/detail/:boardSeq" element={<BoardPost />} />
          
          <Route path="/login" element={<Login />}/>
          <Route path="/registerGeneral" element={<RegisterGeneral />} />
          <Route path="/registerBusiness" element={<RegisterBusiness />} />
          <Route path='/accountbook' element={<AccountBook />} />
          <Route path='/financialnews' element={<Financialnews />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path="/findid" element={<FindId />}/>
          <Route path="/findpassword" element={<FindPassword />}/>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
