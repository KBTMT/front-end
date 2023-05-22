//import "./styles.css";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "9 : 00",
    me: 4000,
    avg: 2400,
    amt: 2400
  },
  {
    name: "10 : 00",
    me: 3000,
    avg: 1398,
    amt: 2210
  },
  {
    name: "11 : 00",
    me: 2000,
    avg: 9800,
    amt: 2290
  },
  {
    name: "12 : 00",
    me: 2780,
    avg: 3908,
    amt: 2000
  },
  {
    name: "13 : 00",
    me: 1890,
    avg: 4800,
    amt: 2181
  },
  {
    name: "14 : 00",
    me: 2390,
    avg: 3800,
    amt: 2500
  },
  {
    name: "15 : 00",
    me: 8290,
    avg: 8731,
    amt: 2100
  },
  {
    name: "16 : 00",
    me: 7690,
    avg: 1234,
    amt: 2100
  },
  {
    name: "17 : 00",
    me: 1990,
    avg: 3468,
    amt: 2100
  },
  {
    name: "18 : 00",
    me: 2490,
    avg: 7452,
    amt: 2100
  },
  {
    name: "19 : 00",
    me: 6090,
    avg: 7532,
    amt: 2100
  },
  {
    name: "20 : 00",
    me: 5490,
    avg: 2345,
    amt: 2100
  }
];

export default function App() {
  return (
    <LineChart
      width={500}
      height={300}
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
      <Line
        type="monotone"
        dataKey="avg"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="me" stroke="#82ca9d" />
    </LineChart>
  );
}
