import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Main from './Pages/Main/Main'
import Header from './Componenets/Header/Header'
import Footer from './Componenets/Footer/Footer'
import RegisterBusiness from './Pages/RegisterPage/RegisterBusinessPage/RegisterBusinessPage'
import RegisterGeneral from './Pages/RegisterPage/RegisterGeneralPage/RegisterGeneralPage'
import GeneralMypage from './Pages/Mypage/GeneralMypage/GeneralMypage';
import LoginPage from './Pages/LoginPage/LoginPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>

          <Route path="/" element={<Main />} />
          <Route path="/registerGeneral" element={<RegisterGeneral />} />
          <Route path="/registerBusiness" element={<RegisterBusiness />}/>
          <Route path="/generalMypage" element={<GeneralMypage />}/>
          <Route path="/login" element={<LoginPage />}/>
        </Routes>
        <Footer />
      </Router>

    </div>
  );
}

export default App;