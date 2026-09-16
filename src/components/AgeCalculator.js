import React, { useState, useEffect } from 'react';
import './AgeCalculator.css'; // Ensure CSS is imported

const formatNumber = (num) => {
    return num.toLocaleString(); // Format number with commas
};

const formatLabel = (value, label) => {
    return `${formatNumber(value)} ${label}${value === 1 ? '' : 's'}`; // Add 's' if value > 1
};

const calculateAge = (startDate) => {
    const start = new Date(startDate);
    const end = new Date(); // Always use the current date as the end date

    // Calculate the total difference in years
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    // Adjust for negative days
    if (days < 0) {
        months--;
        const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0); // Last day of the previous month
        days += lastMonth.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
        years--;
        months += 12;
    }

    // Calculate remaining weeks, hours, minutes, and seconds
    const totalMilliseconds = end - start;
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    const hours = totalHours % 24; // Remaining hours after days
    const minutes = totalMinutes % 60; // Remaining minutes after hours
    const seconds = totalSeconds % 60; // Remaining seconds after minutes

    return {
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
        totalWeeks,
        totalDays,
        totalHours,
        totalMinutes,
        totalSeconds,
        totalMonths
    };
};

const calculateTimeUntilNextBirthday = (birthDateTime) => {
    const now = new Date();
    const nextBirthday = new Date(birthDateTime);
    nextBirthday.setFullYear(now.getFullYear());

    if (now > nextBirthday) {
        nextBirthday.setFullYear(now.getFullYear() + 1); // Move to next year if birthday has passed
    }

    const timeDiff = nextBirthday - now;

    const totalSeconds = Math.floor(timeDiff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const totalMonths = Math.floor(totalDays / 30); // Approximate months

    const remainingDays = totalDays % 30;
    const remainingHours = totalHours % 24;
    const remainingMinutes = totalMinutes % 60;
    const remainingSeconds = totalSeconds % 60;

    return {
        totalMonths,
        remainingDays,
        remainingHours,
        remainingMinutes,
        remainingSeconds
    };
};

const formatAgeWithComma = (age) => {
    const { years, months, days, hours, minutes, seconds } = age;
    let ageParts = [];

    if (years > 0) ageParts.push(formatLabel(years, 'year'));
    if (months > 0 && ageParts.length < 3) ageParts.push(formatLabel(months, 'month'));
    if (days > 0 && ageParts.length < 3) ageParts.push(formatLabel(days, 'day'));
    if (hours > 0 && ageParts.length < 3) ageParts.push(formatLabel(hours, 'hour'));
    if (minutes > 0 && ageParts.length < 3) ageParts.push(formatLabel(minutes, 'minute'));
    if (seconds > 0 && ageParts.length < 3) ageParts.push(formatLabel(seconds, 'second'));

    return ageParts.join(', '); // Join the parts with commas
};

const formatNextBirthdayWithComma = (nextBirthday) => {
    const { totalMonths, remainingDays, remainingHours, remainingMinutes, remainingSeconds } = nextBirthday;
    let nextBirthdayParts = [];

    // Only add fields with non-zero values
    if (totalMonths > 0) nextBirthdayParts.push(formatLabel(totalMonths, 'month'));
    if (remainingDays > 0 && nextBirthdayParts.length < 3) nextBirthdayParts.push(formatLabel(remainingDays, 'day'));
    if (remainingHours > 0 && nextBirthdayParts.length < 3) nextBirthdayParts.push(formatLabel(remainingHours, 'hour'));
    if (remainingMinutes > 0 && nextBirthdayParts.length < 3) nextBirthdayParts.push(formatLabel(remainingMinutes, 'minute'));
    if (remainingSeconds > 0 && nextBirthdayParts.length < 3) nextBirthdayParts.push(formatLabel(remainingSeconds, 'second'));

    // Ensure that we have at most three fields
    if (nextBirthdayParts.length > 3) {
        nextBirthdayParts = nextBirthdayParts.slice(0, 3);
    }

    return nextBirthdayParts.join(', '); // Join the parts with commas
};

const AgeCalculator = () => {
    const [birthDateTime, setBirthDateTime] = useState('');
    const [ageDetails, setAgeDetails] = useState({});
    const [nextBirthdayDetails, setNextBirthdayDetails] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (birthDateTime) {
            const inputDate = new Date(birthDateTime);
            const now = new Date();

            if (inputDate > now) {
                setErrorMessage('Date of birth needs to be earlier than the current date.');
                setAgeDetails({});
                setNextBirthdayDetails({});
                return;
            } else {
                setErrorMessage('');
            }

            setLoading(true); // Start loading
            const interval = setInterval(() => {
                const age = calculateAge(birthDateTime);
                const nextBirthday = calculateTimeUntilNextBirthday(birthDateTime);

                setAgeDetails(age);
                setNextBirthdayDetails(nextBirthday);
                setLoading(false); // Stop loading
            }, 1000);

            return () => {
                clearInterval(interval); // Clean up the interval on component unmount
                setLoading(false); // Ensure loading is stopped
            };
        } else {
            setAgeDetails({});
            setNextBirthdayDetails({});
            setErrorMessage('');
            setLoading(false);
        }
    }, [birthDateTime]);

    const handleBirthDateChange = (e) => {
        const value = e.target.value;
        if (value) {
            const [date, time] = value.split('T');
            setBirthDateTime(`${date}T${time || '00:00'}`);
        }
    };

    const showHappyBirthday = () => {
        return (
            nextBirthdayDetails.totalMonths === 0 &&
            nextBirthdayDetails.remainingDays === 0 &&
            nextBirthdayDetails.remainingHours === 0 &&
            nextBirthdayDetails.remainingMinutes === 0 &&
            nextBirthdayDetails.remainingSeconds === 0
        );
    };

    return (
        <div className="age-calculator">
            <h1>Age Calculator</h1>
            <form>
                <label htmlFor="birthDateTime">Enter your birthdate and time:</label>
                <input
                    type="datetime-local"
                    id="birthDateTime"
                    value={birthDateTime}
                    onChange={handleBirthDateChange}
                />
            </form>
            {errorMessage && (
                <div className="error-message">
                    <p>{errorMessage}</p>
                </div>
            )}
            {loading ? (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
            ) : (
                !errorMessage && birthDateTime && (
                    <>
                        {ageDetails.years !== undefined && (
                            <div className="age-results">
                                <h1>Age</h1>
                                <p className="animated">
                                    <strong>Now your age is:</strong> {formatAgeWithComma(ageDetails)}
                                </p>
                            </div>
                        )}
                        {ageDetails.years !== undefined && (
                            <div className="age-results">
                                <h1>Totals</h1>
                                {ageDetails.years > 0 && (
                                    <p className="animated">
                                        <strong>Years:</strong> {formatLabel(ageDetails.years, 'year')}
                                    </p>
                                )}
                                {ageDetails.totalMonths > 0 && (
                                    <p className="animated">
                                        <strong>Months:</strong> {formatLabel(ageDetails.totalMonths, 'month')}
                                    </p>
                                )}
                                {ageDetails.totalWeeks > 0 && (
                                    <p className="animated">
                                        <strong>Weeks:</strong> {formatLabel(ageDetails.totalWeeks, 'week')}
                                    </p>
                                )}
                                {ageDetails.totalDays > 0 && (
                                    <p className="animated">
                                        <strong>Days:</strong> {formatLabel(ageDetails.totalDays, 'day')}
                                    </p>
                                )}
                                {ageDetails.totalHours > 0 && (
                                    <p className="animated">
                                        <strong>Hours:</strong> {formatLabel(ageDetails.totalHours, 'hour')}
                                    </p>
                                )}
                                {ageDetails.totalMinutes > 0 && (
                                    <p className="animated">
                                        <strong>Minutes:</strong> {formatLabel(ageDetails.totalMinutes, 'minute')}
                                    </p>
                                )}
                                {ageDetails.totalSeconds > 0 && (
                                    <p className="animated">
                                        <strong>Seconds:</strong> {formatLabel(ageDetails.totalSeconds, 'second')}
                                    </p>
                                )}
                            </div>
                        )}
                        {nextBirthdayDetails.totalMonths !== undefined && (
                            <div className="age-results">
                                <h1>Next Birthday</h1>
                                {showHappyBirthday() ? (
                                    <p className="animated">🎉 Happy Birthday! 🎉</p>
                                ) : (
                                    <p className="animated">
                                        <strong>Time until next birthday:</strong> {formatNextBirthdayWithComma(nextBirthdayDetails)}
                                    </p>
                                )}
                            </div>
                        )}
                    </>
                )
            )}
        </div>
    );
};

export default AgeCalculator;
