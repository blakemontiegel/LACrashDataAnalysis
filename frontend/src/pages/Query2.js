import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Query2 = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [collisionSeverity, setCollisionSeverity] = useState('')
    const [crashType, setCrashType] = useState('')

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
            collisionSeverity,
            crashType,
            fromQuery: 'query2'
        }
        setStartDate('')
        setEndDate('')
        setCollisionSeverity('')
        setCrashType('')
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
                Examine the relationship between crash severity levels (minor, moderate, severe, fatal) and types (rear-end, side-impact, pedestrian-involved etc.) in order to identify conditions that most frequently lead to severe outcomes.
            </h2>
            </div>
            <div className='selection-container'>
                <div className='selection'>
                <h2>Collision Severity: </h2>
                        <label><input type="radio" name="collision severity" value="Fatal" onChange={(event) => setCollisionSeverity(event.target.value)} /> Fatal</label>
                        <label><input type="radio" name="collision severity" value="Injury (Severe)" onChange={(event) => setCollisionSeverity(event.target.value)} /> Injury (Severe)</label>
                        <label><input type="radio" name="collision severity" value="Injury (Other Visible)" onChange={(event) => setCollisionSeverity(event.target.value)} /> Injury (Other Visible)</label>
                        <label><input type="radio" name="collision severity" value="Injury (Complaint of Pain)" onChange={(event) => setCollisionSeverity(event.target.value)} /> Injury (Complaint of Pain)</label>
                </div>
                <div className='selection'>
                    <h2>Crash Types: </h2>
                    <label><input type="radio" name="crash type" value="Head-on" onChange={(event) => setCrashType(event.target.value)} /> Head-On</label>
                    <label><input type="radio" name="crash type" value="Sideswipe" onChange={(event) => setCrashType(event.target.value)} /> Sideswipe</label>
                    <label><input type="radio" name="crash type" value="Rear end" onChange={(event) => setCrashType(event.target.value)} /> Rear End</label>
                    <label><input type="radio" name="crash type" value="Broadside" onChange={(event) => setCrashType(event.target.value)} /> Broadside</label>
                    <label><input type="radio" name="crash type" value="Hit Object" onChange={(event) => setCrashType(event.target.value)} /> Hit Object</label>
                    <label><input type="radio" name="crash type" value="Overturned" onChange={(event) => setCrashType(event.target.value)} /> Overturned</label>
                    <label><input type="radio" name="crash type" value="Vehicle/Pedestrian" onChange={(event) => setCrashType(event.target.value)} /> Vehicle/Pedestrian</label>
                    <label><input type="radio" name="crash type" value="Other" onChange={(event) => setCrashType(event.target.value)} /> Other</label>
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

export default Query2;
