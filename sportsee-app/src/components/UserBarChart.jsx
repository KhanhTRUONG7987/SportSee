import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { apiService } from "../services/apiService";
import blackOval from "../assets/images/blackOval.png";
import redOval from "../assets/images/redOval.png";
import "../styles/UserBarChart.css";

const UserBarChart = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [tooltipData, setTooltipData] = useState(null);

  useEffect(() => {
    // Fetch user activity data when the component mounts
    const fetchUserActivity = async () => {
      try {
        const userActivityData = await apiService.getUserActivity(userId);
        setUserData(userActivityData);
      } catch (error) {
        console.error("Error fetching user activity data:", error);
      }
    };

    fetchUserActivity();
  }, [userId]); // Fetch data when the userId changes

  const handleBarMouseEnter = (data, index) => {
    if (
      !userData ||
      !userData.sessions ||
      !userData.sessions[index] ||
      !userData.sessions[index].sessions // Check if sessions array exists
    ) {
      console.error("Invalid user data or sessions:", userData);
      return;
    }
  
    const { day, sessions } = userData.sessions[index];
    const { kilogram, calories } = sessions[0]; 
  
    console.log("Day:", day, "Weight:", kilogram, "Calories:", calories);
    setTooltipData({ day, kilogram, calories });
  };
  

  const handleBarMouseLeave = () => {
    setTooltipData(null);
  };

  // Check if userData is available before generating chartData
  const chartData = userData && userData.sessions
    ? userData.sessions.map((session) => ({
        day: session.day.substring(8),
        weight: session.kilogram,
        calories: session.calories,
      }))
    : [];

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

      {/* Wrap the chart in a styled div */}
      <div className="chart-container" style={{ padding: 5 }}>
        <ResponsiveContainer width={735} height={320} padding={50}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
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
              tickLine={false}
              ticks={chartData.map((entry) => entry.day)}
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
              axisLine={{ stroke: "#DEDEDE" }}
              interval="preserveStartEnd"
              padding={{ left: -42, right: -42 }}
            />

            <YAxis
              className="custom-y-axis"
              line
              orientation="right"
              fontSize={14}
              tick={{ fill: "#9B9EAC" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{
                width: 102,
              }}
              content={<CustomTooltip />}
              wrapperStyle={{ left: 5 }}
            />

            <Bar
              dataKey="weight"
              fill="#282D30"
              barSize={7}
              radius={[3.5, 3.5, 0, 0]}
              onMouseEnter={(props, index) => handleBarMouseEnter(props, index)}
              onMouseLeave={handleBarMouseLeave}
            />
            <Bar
              dataKey="calories"
              fill="#E60000"
              barSize={7}
              radius={[3, 3, 0, 0]}
              onMouseEnter={(props, index) => handleBarMouseEnter(props, index)}
              onMouseLeave={handleBarMouseLeave}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserBarChart;
