import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Query3 = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [initialTime, setInitialTime] = useState('')
    const [finalTime, setFinalTime] = useState('')

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value)
    }

    const handleEndDateChange = (event) => {
        const selectedEndDate = event.target.value;
        if (selectedEndDate >= startDate) {
            setEndDate(selectedEndDate)
        }
    }

    const handleTimeChange = (event) => {
        const time = event.target.value
        const timeArray = time.split(" ")

        setInitialTime(timeArray[0])
        setFinalTime(timeArray[1])

        console.log(timeArray[0])
        console.log(timeArray[1])

    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!initialTime || !finalTime) {
            alert('Please fill in the collision time.');
            return;
        }
        if (!startDate || !endDate) {
            alert('Please fill in the time interval.');
            return;
        }

        const data = {
            startDate,
            endDate,
            initialTime, 
            finalTime,
            fromQuery: 'query3'
        }
        setStartDate('')
        setEndDate('')
        setInitialTime('')
        setFinalTime('')
        navigate('/result', {
            state: { data }
        })
       
    }

    return (
        <div className='page'>
            <div className='page-text'>
                <Link to='/'>
                <span className="material-symbols-outlined" title='Back to Welcome Page'>undo</span>
                </Link> 
            <h2>
            Determines and compares the average number of people injured in crashes throughout the times of day. Allows comparisons to be made across the number of parties involved and time of day.
            </h2>
            </div>
            <div className='selection-container'>
                <div className='selection'>
                <h2>Collision Time: </h2>
                    <label><input type="radio" name="collision time" value="00:00 02:59" onChange={handleTimeChange} /> 00:00~02:59</label>
                    <label><input type="radio" name="collision time" value="03:00 05:59" onChange={handleTimeChange} /> 03:00~05:59</label>
                    <label><input type="radio" name="collision time" value="06:00 08:59" onChange={handleTimeChange} /> 06:00~08:59</label>
                    <label><input type="radio" name="collision time" value="09:00 11:59" onChange={handleTimeChange} /> 09:00~11:59</label>
                    <label><input type="radio" name="collision time" value="12:00 14:59" onChange={handleTimeChange} /> 12:00~14:59</label>
                    <label><input type="radio" name="collision time" value="15:00 17:59" onChange={handleTimeChange} /> 15:00~17:59</label>
                    <label><input type="radio" name="collision time" value="18:00 20:59" onChange={handleTimeChange} /> 18:00~20:59</label>
                    <label><input type="radio" name="collision time" value="21:00 23:59" onChange={handleTimeChange} /> 21:00~23:59</label>
                </div>
                
                <div className='time-interval-container selection'>
                    <h2>Time Interval: </h2>
                    <div>
                        <label htmlFor="start-date">Start Date:</label>
                        <input type="date" id="start-date" name="start-date" value={startDate} onChange={handleStartDateChange} min="2013-01-01" max="2022-12-31" />
                    </div>
                    <div>
                        <label htmlFor="end-date">End Date:</label>
                        <input type="date" id="end-date" name="end-date" value={endDate} onChange={handleEndDateChange} min="2013-01-01" max="2022-12-31" />
                    </div>
                </div>
            </div>
                <Link to='/result'>
                    <button className='button' onClick={handleSubmit}>Generate Results</button>
                </Link>
        </div>
    )
}

export default Query3;
