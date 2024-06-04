import React, { useState, useEffect } from 'react';

const Timer = ({ hour }) => {
    const [time, setTime] = useState(hour * 3600); // Convert hour to seconds

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(prevTime => {
                if (prevTime <= 1) {
                    // Clear interval when time gets to zero
                    clearInterval(intervalId);
                    return 0;
                } else {
                    return prevTime - 1;
                }
            });
        }, 1000);

        // return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    const getFormattedTime = () => {
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time % 3600) / 60);
        let seconds = time % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div>
            <h2>Timer</h2>
            <p>{getFormattedTime()}</p>
        </div>
    );
};

export default Timer;
