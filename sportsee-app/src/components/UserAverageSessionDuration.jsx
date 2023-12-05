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

// CustomTooltip component for displaying custom tooltips
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

// CustomXAxisTick component for customizing X-axis ticks
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
        style={{ letterSpacing: "0.1px" }}
      >
        {payload.value}
      </text>
    </g>
  );
};

// CustomCursor component for customizing the cursor in the chart
const CustomCursor = (props) => {
  console.log(props); 
  return (
    <Rectangle
      fill="#000"
      opacity={0.0975}
      stroke="#000"
      x={props.points[0].x}
      y={-62}
      width={258}
      height={263}
    />
  );
};

// UserAverageSessionDuration component
const UserAverageSessionDuration = ({ userId }) => {
  // State to store user average session data and clicked dot index
  const [average, setAverage] = useState([]);
  const [clickedDotIndex, setClickedDotIndex] = useState(null);
  const day = ["L", "M", "M", "J", "V", "S", "D"];

  // Fetch user average sessions data from the API
  useEffect(() => {
    const fetchUserAverageSessions = async () => {
      try {
        const userAverageSessions = await apiService.getUserAverageSessions(
          userId
        );

        // Transform fetched data for use in the chart
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

  // Fetch user main data from the API
  useEffect(() => {
    const fetchUserMainData = async () => {
      try {
        const userMainData = await apiService.getUserMainData(userId);

        // Log an error if user main data is not found
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

  // Render the UserAverageSessionDuration component
  return (
    <div className="user-average-session-duration">
      <div className="main-rectangle"></div>
      <h3 className={"subtitle"}>Durée moyenne des sessions</h3>

      {/* Render the chart */}
      <div style={{ width: "100%", height: "300px" }}>
        <ResponsiveContainer>
          <LineChart
            data={average}
            margin={{ top: 30, right: 0, left: 0, bottom: 30 }}
          >
            {/* Define linear gradient for the line chart */}
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

            {/* Render the line chart */}
            <Line
              type="natural"
              dataKey="sessionLength"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={false}
              isAnimationActive={false}
              clipPath="url(#chartClipPath)"
            />

            {/* Render scatter plot with clickable dots */}
            <Scatter
              data={average}
              fill="#fff"
              onClick={(entry, index) => setClickedDotIndex(index)}
            >
              {average.map((entry, index) => (
                <Cell key={`dot-${index}`} cx={0} cy={0} />
              ))}
            </Scatter>

            {/* Render reference dot on clicked dot */}
            {clickedDotIndex !== null && (
              <ReferenceDot
                x={clickedDotIndex}
                y={average[clickedDotIndex].sessionLength}
                r={7}
                fill="rgba(255, 255, 255, 0.7)"
              />
            )}

            {/* Render X-axis with custom ticks */}
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              padding={{ left: 15, right: 15 }}
              tick={<CustomXAxisTick />}
              interval={0}
            />

            {/* Render custom tooltip and cursor in the chart */}
            <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserAverageSessionDuration;
