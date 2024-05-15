export function getRemainingMin(startTime,endTime){
    const diffMilliseconds = endTime - startTime;
    const diffMinutes = diffMilliseconds / (1000 * 60);

    return diffMinutes;
}