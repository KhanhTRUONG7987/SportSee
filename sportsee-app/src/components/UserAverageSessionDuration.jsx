import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Scatter,
  Cell,
  Tooltip,
  ReferenceDot,
  XAxis,
} from "recharts";
import {
  mockUserAverageSessions,
  mockUserMainData,
} from "../services/mockData";
import "../styles/UserAverageSessionDuration.css";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="customTooltip">
        <p className="labelTooltip">{`${payload[0].value} min`}</p>
      </div>
    );
  }
  return null;
};

const CustomXAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={5}
        y={-60}
        dy={0}
        textAnchor="end"
        fill="#FFF"
        className={"customXAxis"}
        style={{ letterSpacing: "2px" }}
      >
        {payload.value}
      </text>
    </g>
  );
};

const UserAverageSessionDuration = ({ userId }) => {
  const [average, setAverage] = useState([]);
  const [clickedDotIndex, setClickedDotIndex] = useState(null);
  const day = ["L", "M", "M", "J", "V", "S", "D"];

  useEffect(() => {
    const userAverageSessions = mockUserAverageSessions.find(
      (data) => data.userId.toString() === userId
    );

    if (!userAverageSessions) {
      console.error(`User average sessions not found for ID: ${userId}`);
      return;
    }

    const data = userAverageSessions.sessions.map((session, index) => ({
      day: day[index],
      sessionLength: session.sessionLength,
    }));

    console.log("Data retrieved:", data);
    setAverage(data);
  }, [userId]);

  if (!average || average.length === 0) {
    console.error(`No data available for ID: ${userId}`);
    return <p className="error-message">No data available</p>;
  }

  const userMainData = mockUserMainData.find(
    (data) => data.id === parseInt(userId)
  );

  if (!userMainData) {
    console.error(`User main data not found for ID: ${userId}`);
    return <p className="error-message">User main data not found</p>;
  }

  return (
    <div className="user-average-session-duration">
      <div className="main-rectangle"></div>
      <h3 className={"subtitle"}>Durée moyenne des sessions</h3>
      {clickedDotIndex !== null && (
        <div
        className="additional-rectangle"
        style={{
          left: `calc(${(clickedDotIndex / (average.length - 1)) * 100}%)`,
          width: `calc(${((average.length - 1 - clickedDotIndex) / (average.length - 1)) * 100}%)`,
        }}
      ></div>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={average} margin={{ top: 30, right: 0, left: 0, bottom: 100 }}>
          <defs>
            <clipPath id="chartClipPath">
              <rect x="-20" y="20" height="253" width="94" />
            </clipPath>

            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "white", stopOpacity: 0.2 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "white", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>

          <Line
            type="natural"
            dataKey="sessionLength"
            stroke="url(#lineGradient)"
            strokeWidth={3}
            dot={false}
            isAnimationActive={false}
            clipPath="url(#chartClipPath)"
          />

          <Scatter data={average} fill="#fff">
            {average.map((entry, index) => (
              <Cell
                key={`dot-${index}`}
                cx={0}
                cy={0}
                onClick={() => setClickedDotIndex(index)}
              />
            ))}
          </Scatter>

          {clickedDotIndex !== null && (
            <ReferenceDot
              x={clickedDotIndex}
              y={average[clickedDotIndex].sessionLength}
              r={7}
              fill="rgba(255, 255, 255, 0.7)"
            />
          )}

          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            padding={{ left: 10, right: 10 }}
            tick={<CustomXAxisTick />}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "rgba(0, 0, 0, 0.1)", strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserAverageSessionDuration;
