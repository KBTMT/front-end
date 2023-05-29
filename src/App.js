import './App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';

import Main from './Pages/Main/Main'
import Header from './Componenets/Header/Header'
import Footer from './Componenets/Footer/Footer'
import RegisterBusiness from './Pages/RegisterPage/RegisterBusinessPage/RegisterBusinessPage'
import RegisterGeneral from './Pages/RegisterPage/RegisterGeneralPage/RegisterGeneralPage'
import LoginPage from './Pages/LoginPage/LoginPage';

import FindId from './Pages/Find/FindId/FindId'
import FindPassword from './Pages/Find/FindPassword/FindPassword'
import GeneralMypage from './Pages/Mypage/GeneralMypage/GeneralMypage';
import GeneralMyFinance from './Pages/Mypage/GeneralMyFinance/GeneralMyFinance'
import BusinessMypage from './Pages/Mypage/BusinessMypage/BusinessMypage';

//import Login from "./Pages/Login/Login";


import AccountBookMain from './Pages/AccountBookPage/AccountBookMain/AccountBookMain'
import AccountBookDaily from './Pages/AccountBookPage/AccountBookDaily/AccountBookDaily'

import BoardMain from './Pages/Board/BoardMain/BoardMain';
import BoardWrite from './Pages/Board/BoardWrite/BoardWrite';
import BoardPost from './Pages/Board/BoardPost/BoardPost';
import Financialnews from './Pages/Financialnews/Financialnews';

import Reported from './Pages/ReportedPage/Reported/Reported';
import ReportedDetail from './Pages/ReportedPage/ReportedDetail/ReportedDetail';

import MyActivity from './Pages/MyActivity/MyActivity';
import Sidebar from './Componenets/Sidebar/Sidebar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Header /> */}
        <Sidebar>
        <Routes>

          <Route path="/" element={<Main />} />
          <Route path="/registerGeneral" element={<RegisterGeneral />} />
          <Route path="/registerBusiness" element={<RegisterBusiness />}/>
          <Route path="/generalMypage" element={<GeneralMypage />}/>
          <Route path="/businessMypage" element={<BusinessMypage />}/>

          <Route path="/login" element={<LoginPage />}/>
          <Route path='/findId' element={<FindId />}/>
          <Route path='/findPassword' element={<FindPassword />}/>
          <Route path='/accountbook' element={<AccountBookMain />} />
          <Route path='/accountbook/:formattedDate' element={<AccountBookDaily />} />
    
          <Route path='/boardMain' element={<BoardMain />} /> 
          <Route path='/board/register' element={<BoardWrite />} />
          {/* <Route path='/boardpost' element={<BoardPost />} /> */}
          <Route path='/board/boardpost/:boardSeq' Component={BoardPost} />

          <Route path='/financialnews' element={<Financialnews />} />

          <Route path='/admin/reported' Component={Reported}/>
          <Route path='/admin/reported/detail/:reportedSeq/:status/:reportedFlag' Component={ReportedDetail}/>

          <Route path="/generalMypage/myActivity" element={<MyActivity />} />
          <Route path='/generalMypage/myFinance' element={<GeneralMyFinance/>}/>
        </Routes>
        </Sidebar>
      </BrowserRouter>

    </div>
  );
}

export default App;