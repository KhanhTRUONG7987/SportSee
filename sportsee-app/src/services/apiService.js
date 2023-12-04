import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const apiService = {
  // Standardize user main data format
  standardizeUserMainData: (userData) => {
    if (!userData || !userData.data || !userData.data.userInfos) {
      console.error(
        "Error: userInfos property not found in API response:",
        userData
      );
      throw new Error("Invalid API response: userInfos property not found");
    }

    const { id, data } = userData;
    const { userInfos, todayScore, keyData } = data;

    return {
      id,
      firstName: userInfos.firstName || "",
      lastName: userInfos.lastName || "",
      age: userInfos.age || 0,
      todayScore: todayScore || 0,
      keyData: {
        calorieCount: keyData?.calorieCount || 0,
        proteinCount: keyData?.proteinCount || 0,
        carbohydrateCount: keyData?.carbohydrateCount || 0,
        lipidCount: keyData?.lipidCount || 0,
      },
    };
  },

  // Standardize user activity format
  standardizeUserActivity: (activityData) => {
    console.log("Activity Data:", activityData);

    if (!activityData || !activityData.data || !activityData.data.sessions) {
      console.error("Error: Invalid user activity data:", activityData);
      throw new Error("Invalid user activity data");
    }

    return {
      userId: activityData.data.userId || null,
      sessions: activityData.data.sessions.map((session) => ({
        day: session.day || null,
        kilogram: session.kilogram || 0,
        calories: session.calories || 0,
      })),
    };
  },

  // Standardize user average sessions format
  standardizeUserAverageSessions: (sessionsData) => {
    if (!sessionsData || !sessionsData.data || !sessionsData.data.sessions) {
      console.error("Error: Invalid user average sessions data:", sessionsData);
      throw new Error("Invalid user average sessions data");
    }

    const { userId, data } = sessionsData;

    return {
      userId,
      sessions: data.sessions.map((session) => ({
        day: session.day,
        sessionLength: session.sessionLength,
      })),
    };
  },

  // Standardize user performance format
  standardizeUserPerformance: (performanceData) => {
    if (
      !performanceData ||
      !performanceData.data ||
      !performanceData.data.kind
    ) {
      console.error("Error: Invalid user performance data:", performanceData);
      throw new Error("Invalid user performance data");
    }

    const kind = Array.isArray(performanceData.data.kind)
      ? performanceData.data.kind.reduce(
          (acc, kindItem, index) => ({ ...acc, [index + 1]: kindItem }),
          {}
        )
      : performanceData.data.kind;

    return {
      userId: performanceData.userId,
      kind,
      data: performanceData.data.data.map((dataPoint) => ({
        value: dataPoint.value,
        kind: dataPoint.kind,
      })),
    };
  },

  // API functions
  getUserMainData: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
      console.log("API Response - getUserMainData:", response.data);

      const userMainData = apiService.standardizeUserMainData(response.data);
      console.log("Standardized User Main Data:", userMainData);

      return userMainData;
    } catch (error) {
      console.error("Error fetching user main data:", error);
      throw error;
    }
  },

  getUserActivity: async (userId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/user/${userId}/activity`
      );
      console.log("API Response - getUserActivity:", response.data);
      return apiService.standardizeUserActivity(response.data);
    } catch (error) {
      console.error("Error fetching user activity data:", error);
      throw error;
    }
  },

  getUserAverageSessions: async (userId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/user/${userId}/average-sessions`
      );
      console.log("API Response - getUserAverageSessions:", response.data);
      return apiService.standardizeUserAverageSessions(response.data);
    } catch (error) {
      console.error("Error fetching user average sessions data:", error);
      throw error;
    }
  },

  getUserPerformance: async (userId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/user/${userId}/performance`
      );
      return apiService.standardizeUserPerformance(response.data);
    } catch (error) {
      console.error("Error fetching user performance data:", error.message);
      throw new Error(
        "Failed to fetch user performance data. Please try again."
      );
    }
  },
};
