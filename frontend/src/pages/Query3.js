import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Query3 = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value)
    }

    const handleEndDateChange = (event) => {
        const selectedEndDate = event.target.value;
        if (selectedEndDate >= startDate) {
            setEndDate(selectedEndDate)
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            startDate,
            endDate,
            //collisionSeverities,
            //crashTypes,
            fromQuery: 'query3'
        }
        navigate('/result', {
            state: { data }
        })
       
    }

    return (
        <div className='page'>
            <div className='page-text'>
                <Link to='/welcome'>
                <span className="material-symbols-outlined" title='Back to Welcome Page'>undo</span>
                </Link> 
            <h2>
                Determine and compare the average number of people injured in crashes throughout the times of day in Los Angeles county between 2013 and 2022. Allow comparisons to be made across the number of parties involved and time of day.
            </h2>
            </div>
            <div className='selection-container'>
                {/*
                <div className='selection'>
                <h2>Collision Severity: </h2>
                    <label><input type="checkbox" value="1" onChange={handleCollisionSeverityChange} /> Fatal</label>
                    <label><input type="checkbox" value="2" onChange={handleCollisionSeverityChange} /> Injury (Severe)</label>
                    <label><input type="checkbox" value="3" onChange={handleCollisionSeverityChange} /> Injury (Other Visible)</label>
                    <label><input type="checkbox" value="4" onChange={handleCollisionSeverityChange} /> Injury (Complaint of Pain)</label>
                </div>
                <div className='selection'>
                    <h2>Crash Types: </h2>
                    <label><input type="checkbox" value="A" onChange={handleCrashTypeChange} /> Head On</label>
                    <label><input type="checkbox" value="B" onChange={handleCrashTypeChange} /> Sideswipe</label>
                    <label><input type="checkbox" value="C" onChange={handleCrashTypeChange} /> Rear End</label>
                    <label><input type="checkbox" value="D" onChange={handleCrashTypeChange} /> Broadside</label>
                    <label><input type="checkbox" value="E" onChange={handleCrashTypeChange} /> Hit Object</label>
                    <label><input type="checkbox" value="F" onChange={handleCrashTypeChange} /> Overturned</label>
                    <label><input type="checkbox" value="G" onChange={handleCrashTypeChange} /> Vehicle/Pedestrian</label>
                    <label><input type="checkbox" value="H" onChange={handleCrashTypeChange} /> Other</label>
                    <label><input type="checkbox" value="--" onChange={handleCrashTypeChange} /> Not Stated</label>
                </div>
                */}
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
