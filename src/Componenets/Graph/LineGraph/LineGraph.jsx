//import "./styles.css";
import React, { useEffect, useState } from 'react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";



export default function App(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(props.data);
    const newData = [];
    for (let i = 6; i <= 24; i += 2) {
      const hour1Data = props.data.find((item) => item.TIME === i % 24);
      const hour2Data = props.data.find((item) => item.TIME === (i + 1) % 24);
      const cost = (hour1Data?.TOTAL_PRICE || 0) + (hour2Data?.TOTAL_PRICE || 0);
      newData.push({
        time: `${(i + 1) % 24}시`,
        cost: cost
      });
    }
    setData(newData);
  }, [props.data]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>시간대별 소비 금액</h1>
    <LineChart
      width={700}
      height={500}
      data={data}
      
    >
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip 
        formatter={(value, name, props) => [value+"원"]}
      />
      <Line type="monotone" dataKey="cost" stroke="#82ca9d" strokeWidth={3} />
    </LineChart>
    </div>
  );
}
