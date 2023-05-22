import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Main from './Pages/Main/Main'
import Header from './Componenets/Header/Header'
import Footer from './Componenets/Footer/Footer'
import RegisterBusiness from './Pages/RegisterPage/RegisterBusinessPage/RegisterBusinessPage'
import RegisterGeneral from './Pages/RegisterPage/RegisterGeneralPage/RegisterGeneralPage'
import LoginPage from './Pages/LoginPage/LoginPage';

import GeneralMypage from './Pages/Mypage/GeneralMypage/GeneralMypage';
import GeneralMyFinance from './Pages/Mypage/GeneralMyFinance/GeneralMyFinance'
import BusinessMypage from './Pages/Mypage/BusinessMypage/BusinessMypage';

import AccountBookMain from './Pages/AccountBookPage/AccountBookMain/AccountBookMain'
import BoardMain from './Pages/Board/BoardMain/BoardMain';
import BoardWrite from './Pages/Board/BoardWrite/BoardWrite';
import BoardPost from './Pages/Board/BoardPost/BoardPost';
import Financialnews from './Pages/Financialnews/Financialnews';

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
          <Route path="/businessMypage" element={<BusinessMypage />}/>

          <Route path="/login" element={<LoginPage />}/>
          <Route path='/generalMypage/generalMyFinance' element={<GeneralMyFinance />} />
          <Route path='/accountbook' element={<AccountBookMain />} />


          <Route path='/boardMain' element={<BoardMain />} /> 
          <Route path='/board/register' element={<BoardWrite />} />
          <Route path='/boardpost' element={<BoardPost />} />


          <Route path='/financialnews' element={<Financialnews />} />
        </Routes>
        <Footer />
      </Router>

    </div>
  );
}

export default App;