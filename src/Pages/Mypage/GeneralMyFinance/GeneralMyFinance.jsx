import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatByCategory from '../../../Componenets/Graph/StatByCategory/StatByCategory';
import LineGraph  from '../../../Componenets/Graph/LineGraph/LineGraph';
import TargetCompare  from '../../../Componenets/Graph/TargetCompare/TargetCompare';
import styled from 'styled-components';

const Img = styled.img`
  width: 600px;
  margin-top: 20px;
`;

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
        <Img src={require('../../../img/my_financial.png')} />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1}}>
          <StatByCategory data={analysisByCat} />
        </div>
        <div style={{ flex: 1 }}>
          <TargetCompare data={[sumIncome, sumConsume, targetSaving]} />
        </div>
      </div>
      <LineGraph data={analysisByHour} />
    </div>
    
    );
};

export default GeneralMyFinance;