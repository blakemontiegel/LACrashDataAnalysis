import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Query2 = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [collisionSeverities, setCollisionSeverities] = useState([])
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

    const handleCollisionSeverityChange = (event) => {
        const selectedCollisionSeverity = event.target.value
        setCollisionSeverities(prevTypes => {
            if (prevTypes.includes(selectedCollisionSeverity)) {
                return prevTypes.filter(type => type !== selectedCollisionSeverity)
            } else {
                return [...prevTypes, selectedCollisionSeverity];
            }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (collisionSeverities === 0 ) {
            alert('Please select at least one collision severity.');
            return;
        }
        if (!crashType) {
            alert('Please select a crash type.');
            return;
        }
        if (!startDate || !endDate) {
            alert('Please fill in the time interval.');
            return;
        }

        const data = {
            startDate,
            endDate,
            collisionSeverities,
            crashType,
            fromQuery: 'query2'
        }
        setStartDate('')
        setEndDate('')
        setCollisionSeverities([])
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
            Examines the relationship between crash severity levels and crash types in order to identify conditions that most frequently lead to severe outcomes.
            </h2>
            </div>
            <div className='selection-container'>
                <div className='selection'>
                <h2>Collision Severity: </h2>
                        <label><input type="checkbox" name="collision severity" value="1" onChange={handleCollisionSeverityChange} /> Fatal</label>
                        <label><input type="checkbox" name="collision severity" value="2" onChange={handleCollisionSeverityChange} /> Injury (Severe)</label>
                        <label><input type="checkbox" name="collision severity" value="3" onChange={handleCollisionSeverityChange} /> Injury (Other Visible)</label>
                        <label><input type="checkbox" name="collision severity" value="4" onChange={handleCollisionSeverityChange} /> Injury (Complaint of Pain)</label>
                </div>
                <div className='selection'>
                    <h2>Crash Type: </h2>
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
