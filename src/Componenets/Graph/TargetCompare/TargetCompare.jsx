import React, { useEffect, useState } from 'react';


import {
  BarChart, Cell, 
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const COLORS = ["#939DFF","#FF979D","#B7FF5B","#FFAB91"];

export default function App(props) {
    const [sumIncome, setSumIncome] = useState(0);
    const [sumConsume, setSumConsume] = useState(0);
    const [targetSaving, setTargetSaving] = useState(0);
  
    useEffect(() => {
      if (props.data && props.data.length === 3) {
        setSumIncome(props.data[0]);
        setSumConsume(props.data[1]);
        setTargetSaving(props.data[2]);
      }
    }, [props.data]);
  
    const data = [
      { name: '총 수익', value: sumIncome },
      { name: '총 지출', value: sumConsume },
      { name: '목표 저축액', value: targetSaving },
      { name: '가용금액', value : sumIncome-sumConsume-targetSaving }
    ];
  
    return (
      // <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width : '30%' }}>
     <div>
        <h1>지출 목표 금액과 비교</h1>
        <BarChart
          width={500}
          height={500}
          data={data}
          margin={{
            left: 20
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value, name, props) => [value+"원"]}/>
          <Bar dataKey="value" fill="#8884d8" >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}  />
        ))}
          </Bar>
        </BarChart>
      </div>
    );
}
