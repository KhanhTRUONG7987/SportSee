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
  Rectangle,
} from "recharts";
import { apiService } from "../services/apiService";
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
        y={-25}
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
    // Fetch user average sessions data from the API
    const fetchUserAverageSessions = async () => {
      try {
        const userAverageSessions = await apiService.getUserAverageSessions(
          userId
        );

        const data = userAverageSessions.sessions.map((session, index) => ({
          day: day[index],
          sessionLength: session.sessionLength,
        }));

        setAverage(data);
      } catch (error) {
        console.error(
          `Error fetching user average sessions for ID ${userId}:`,
          error
        );
      }
    };

    fetchUserAverageSessions();
  }, [userId]);

  useEffect(() => {
    // Fetch user main data from the API
    const fetchUserMainData = async () => {
      try {
        // Use the getUserMainData function from apiService
        const userMainData = await apiService.getUserMainData(userId);

        if (!userMainData) {
          console.error(`User main data not found for ID: ${userId}`);
          return;
        }
      } catch (error) {
        console.error(`Error fetching user main data for ID ${userId}:`, error);
      }
    };

    fetchUserMainData();
  }, [userId]);

  return (
    <div className="user-average-session-duration">
      <div className="main-rectangle"></div>
      <h3 className={"subtitle"}>Durée moyenne des sessions</h3>

      <div style={{ width: "100%", height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={average}
            margin={{ top: 30, right: 0, left: 0, bottom: 30 }}
          >
            <defs>
              <linearGradient
                id="lineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
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

            <Scatter
              data={average}
              fill="#fff"
              onClick={(entry, index) => setClickedDotIndex(index)}
            >
              {average.map((entry, index) => (
                <Cell key={`dot-${index}`} cx={0} cy={0} />
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

            {/* Add the dynamic overlay */}
            <Rectangle
              x={
                clickedDotIndex !== null
                  ? (clickedDotIndex * 100) / (average.length - 1)
                  : 0
              }
              y={0}
              width={
                clickedDotIndex !== null
                  ? 100 - (clickedDotIndex * 100) / (average.length - 1) + "%"
                  : 0
              }
              height="100%"
              fill="#000"
              visibility={clickedDotIndex !== null ? "visible" : "hidden"}
              opacity={0.0975}
              zIndex={100000}
            />

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
    </div>
  );
};

export default UserAverageSessionDuration;
