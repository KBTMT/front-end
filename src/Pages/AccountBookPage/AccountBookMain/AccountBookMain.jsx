import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Accountbook from '../../../Componenets/AccountBook/Accountbook';
import TargetCompare from '../../../Componenets/Graph/TargetCompare/TargetCompare'
import './AccountBookMain.css';

const AccountBookMain = () => {
    const [sumConsume, setSumConsume] = useState(0);
    const [sumIncome, setSumIncome] = useState(0);
    const [targetSaving, setTargetSaving] =  useState(0);
    const [user, setUser] = useState([]);
  useEffect(() => {
    const userFromSession = JSON.parse(sessionStorage.getItem('vo'));
    if (userFromSession) {
      setUser(userFromSession);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8899/generalmypage/generalMyFinance', {
        params: { 
            generalId: user.generalId , 
            saving : user.saving
        }
      });
      setSumConsume(response.data.sumConsumption[0].TOTAL_PRICE);
      setSumIncome(response.data.sumIncome[0].TOTAL_PRICE);
      setTargetSaving(response.data.targetSaving[0].target);
      
    } catch (error) {
      console.log(error);
    }};
    return (
        <div>
        <img src={require('../../../img/tickle_write_bar.png')} style={ {width : "500px"}} />
        <div className='account_book_main_container'>
            <div className='left_side_container'>
                <TargetCompare data = {[sumIncome, sumConsume, targetSaving]}/>
            </div>
            <div className='right_side_container'>
                <Accountbook />
            </div>
        </div>
        </div>
    );
};

export default AccountBookMain;