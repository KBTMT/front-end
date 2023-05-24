import React, { useEffect, useState } from 'react';


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";


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
  
    // const data = [
    //   { name: '4월 총 수익', value: sumIncome },
    //   { name: '4월 총 지출', value: sumConsume },
    //   { name: '목표 저축액', value: targetSaving }
    // ];
  
    const data = [
        {name : 'aaa', 수익 : sumIncome, 지출 : sumConsume, '목표 저축액' : targetSaving}
    ];
    return (
      <div>
        <h1>지출 목표 금액과 비교</h1>
        <BarChart
          width={400}
          height={500}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="수익" fill="#8884d8" />
          <Bar dataKey="지출" fill="#FF80AB" />
          <Bar dataKey="목표 저축액" fill="#00B8D4" />
        </BarChart>
      </div>
    );
}
