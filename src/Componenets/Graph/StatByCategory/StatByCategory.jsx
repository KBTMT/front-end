import React, { useEffect, useState }  from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, LabelList, ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid  } from "recharts";
import "./StatByCategory.css";
const COLORS = ["#6E84FB", "#FFAD80","#FCFF55","#6EC0FB","#6EFBFB","#FF7D7D","#80FF7D","#EE89FF"];
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

  if (percent === 0) {
    return null;
  }

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const myCat = {
  1: '식비',
  2: '주거비',
  3: '교통비', 
  4: '의료/건강', 
  5: '생활용품', 
  6: '여가/문화', 
  7: '패션/미용',
  8: '기타'
};


export default function App(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const newData = Object.keys(myCat).map((catKey) => {
      const catNumber = parseInt(catKey);
      const category = myCat[catNumber];
      const item = props.data.find((item) => item.CONSUMPTION_CAT === catNumber);
      const value = item ? item.TOTAL_PRICE : 0;
      return {
        name: category,
        value: value
      };
    });
    setData(newData);
    console.log(data);
  }, [props.data]);
  const renderColorfulLegendText = (value, entry) => {
    const { color } = entry;
    return <span style={{ color : "black", fontWeight : "500" }}>{value}</span>;
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>카테고리별 소비 금액</h1> 
      <div></div>
      <label className="toggle-switch">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
      />
      <span className="slider"></span>
    </label><br></br>
    {isChecked?(
      <div>
      <PieChart width={750} height={500}>
        <Pie
          data={data}
          cx={300}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          isAnimationActive={false}
          outerRadius={200}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      <Tooltip 
        formatter={(value, name, props) => [value+"원", name]}
      />
      <Legend layout="vertical" align="left" verticalAlign="top"
        iconType = "circle" 
        formatter={renderColorfulLegendText} 
      />
      </PieChart>
      </div>
    ):(
      <div>
      <BarChart
          width={750}
          height={500}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value, name, props) => [value+"원"]}/>
          {/* <Legend /> */}
          <Bar dataKey="value" fill="#8884d8" >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}  />
        ))}
          </Bar>
        </BarChart>
        </div>
    )}
   
    </div>
  );
}