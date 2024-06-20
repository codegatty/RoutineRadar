import React, { createContext, useState } from "react";
import { weekStarterEnderFinder } from '../utility/weekStarterAndEnder';

export const AnalyticsContext = createContext({
    analytics: {},
    storeAnalytics: (analytics) => {},
    updateWeeklyTaskData: (score) => {},
    flushAnalytics: () => {}
});

function AnalyticsContextProvider({ children }) {
    const [analytics, setAnalytics] = useState(null);

    function storeAnalytics(data) {
        setAnalytics(data);
    }

    function updateWeeklyTaskData(score) {
        if (!analytics) return;

        const [startDate, endDate] = weekStarterEnderFinder();

        const currentDate = new Date();
        const diffInMilliseconds = currentDate - startDate;
        const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

        const newTaskData = analytics.weeklyTaskData.map((ele, index) => {
            if (diffInDays === index) {
                return ele + 1;
            } else {
                return ele;
            }
        });

        const newScore = analytics.weeklyScoreData + score;

        const updatedAnalytics = {
            ...analytics,
            weeklyTaskData: newTaskData,
            weeklyScoreData: newScore
        };

        setAnalytics(updatedAnalytics);

        console.log(updatedAnalytics);
    }

    function flushAnalytics() {
        setAnalytics(null);
    }

    const values = {
        analytics,
        storeAnalytics,
        updateWeeklyTaskData,
        flushAnalytics
    };

    return (
        <AnalyticsContext.Provider value={values}>
            {children}
        </AnalyticsContext.Provider>
    );
}

export default AnalyticsContextProvider;
