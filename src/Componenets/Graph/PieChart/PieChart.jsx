import React, { useEffect, useState }  from "react";
import { PieChart, Pie, Cell } from "recharts";


// const COLORS = ["#E57373", "#BA68C8","#BBDEFB", "#FFAB91", "#4FC3F7","#81C784","#FFD54F","#FFCC80"];
const COLORS = ["#FF80AB", "#D500F9","#2979FF","#00B8D4","#64DD17","#CDDC39"]
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function App(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const newData = props.data.map((item) => ({
      name: item.CONSUMPTION_CAT,
      value: item.TOTAL_PRICE
    }));
    setData(newData);
  }, [props.data]);


  return (
    <div>
      <h1>카테고리별 소비 금액</h1> 
      <PieChart width={900} height={900}>
        <Pie
          data={data}
          cx={300}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={200}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}