import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatByCategory from '../../../Componenets/Graph/StatByCategory/StatByCategory';
import LineGraph  from '../../../Componenets/Graph/LineGraph/LineGraph';
import TargetCompare  from '../../../Componenets/Graph/TargetCompare/TargetCompare';
 

const GeneralMyFinance = () => {
    const [sumConsume, setSumConsume] = useState(0);
    const [sumIncome, setSumIncome] = useState(0);
    const [maxCat, setMaxCat] = useState([]);
    const [analysisByHour, setAnalysisByHour] =  useState([]);
    const [analysisByCat, setAnalysisByCat] =  useState([]);
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
      // 데이터 처리 로직
      setSumConsume(response.data.sumConsumption[0].TOTAL_PRICE);
      setSumIncome(response.data.sumIncome[0].TOTAL_PRICE);
      setMaxCat([response.data.getMaxCat[0].TOTAL_PRICE, response.data.getMaxCat[0].CONSUMPTION_CAT]);
      setAnalysisByHour(response.data.getAnalysisByHour);
      setAnalysisByCat(response.data.getAnalysisByCat);
      setTargetSaving(response.data.targetSaving[0].target);
      
    } catch (error) {
      console.log(error);
    }
  };
    return (
        <div>
            <h2>내 소비 분석</h2>
            {/* <li>이번달 소비 총 소비 금액(total price) : {sumConsume}</li>
            <li>이번달 소비 총 수입 금액(total price) : {sumIncome}</li>
            <li>최대 소비 카테고리 : {maxCat[1]}</li>
            <li>최대 소비 카테고리  금액: {maxCat[0]}</li>
     */}
            <StatByCategory data = {analysisByCat}/>
            <LineGraph data = {analysisByHour}/>
            <TargetCompare data = {[sumIncome, sumConsume, targetSaving]}/>
        </div>
    );
};

export default GeneralMyFinance;