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
    const newData = props.data.map((item) => ({
      time: item.TIME,
      cost: item.TOTAL_PRICE
    }));
    setData(newData);
  }, [props.data]);

  return (
    <div>
      <h1>시간대별 소비 금액</h1>
    <LineChart
      width={800}
      height={500}
      data={data}
      margin={{
        top: 5,
        left: 200,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="cost" stroke="#82ca9d" strokeWidth={3} />
    </LineChart>
    </div>
  );
}
