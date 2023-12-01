import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { mockUserActivity } from "../services/mockData";
import blackOval from "../assets/images/blackOval.png";
import redOval from "../assets/images/redOval.png";
import "../styles/UserBarChart.css";

const UserBarChart = ({ userId }) => {
  const userData = mockUserActivity.find(
    (data) => data.userId.toString() === userId
  );

  const [tooltipData, setTooltipData] = useState(null);

  const handleBarMouseEnter = (data, index) => {
    const { day, kilogram, calories } = userData.sessions[index];
    console.log("Day:", day, "Weight:", kilogram, "Calories:", calories);
    setTooltipData({ day, kilogram, calories });
  };

  const handleBarMouseLeave = () => {
    setTooltipData(null);
  };

  if (!userData) {
    console.error(`User data not found for ID: ${userId}`);
    return <p className="error-message">User data not found</p>;
  }

  const chartData = userData.sessions.map((session) => ({
    day: session.day.substring(8),
    weight: session.kilogram,
    calories: session.calories,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { weight, calories } = payload[0].payload;
      return (
        <div className="dialogue">
          <p>{`${weight} kg`}</p>
          <p>{`${calories} Kcal`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="user-bar-chart">
      <div className="title-legend-group">
        <p className="activity-title">Activité quotidienne</p>
        <div className="legend-group">
          <div className="weight-group">
            <img src={blackOval} alt="black oval" />
            <span className="legend-text">Poids (kg)</span>
          </div>
          <div className="calories-group">
            <img src={redOval} alt="red oval" />
            <span className="legend-text">Calories brûlées (kCal)</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width={835} height={320}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {/* Render dashed horizontal grid lines for all except the first one */}
          {chartData.map((_, index) => (
            <CartesianGrid
              key={index}
              strokeDasharray={"3 3"}
              stroke="#ccc"
              vertical={false}
            />
          ))}

          <XAxis
            dataKey="day"
            tick={({ x, y, payload }) => (
              <text
                x={x}
                y={y}
                dy={16}
                textAnchor="middle"
                fill="#9B9EAC"
                fontSize={14}
              >
                {+payload.value}
              </text>
            )}
            axisLine={true}
            tickLine={false}
          />

          <YAxis
            line
            orientation="right"
            fontSize={14}
            tick={{ fill: "#9B9EAC" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />

          <Bar
            dataKey="weight"
            fill="#282D30"
            barSize={7}
            radius={[3.5, 3.5, 0, 0]}
            onMouseEnter={handleBarMouseEnter}
            onMouseLeave={handleBarMouseLeave}
          />
          <Bar
            dataKey="calories"
            fill="#E60000"
            barSize={7}
            radius={[3, 3, 0, 0]}
            onMouseEnter={handleBarMouseEnter}
            onMouseLeave={handleBarMouseLeave}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserBarChart;
