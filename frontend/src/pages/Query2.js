import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Query2 = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [crashTypes, setCrashTypes] = useState([])
    const [singleCollisionSeverity, setsingleCollisionSeverity] = useState('')

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value)
    }

    const handleEndDateChange = (event) => {
        const selectedEndDate = event.target.value;
        if (selectedEndDate >= startDate) {
            setEndDate(selectedEndDate)
        }
    }

    const handleCrashTypeChange = (event) => {
        const selectedCrashType = event.target.value
        setCrashTypes(prevTypes => {
            if (prevTypes.includes(selectedCrashType)) {
                return prevTypes.filter(type => type !== selectedCrashType)
            } else {
                return [...prevTypes, selectedCrashType];
            }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!singleCollisionSeverity) {
            alert('Please select a collision severity.');
            return;
        }
        if (crashTypes === 0 ) {
            alert('Please select at least one crash type.');
            return;
        }
        if (!startDate || !endDate) {
            alert('Please fill in the time interval.');
            return;
        }

        const data = {
            startDate,
            endDate,
            singleCollisionSeverity,
            crashTypes,
            fromQuery: 'query2'
        }
        setStartDate('')
        setEndDate('')
        setCrashTypes([])
        setsingleCollisionSeverity('')
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
                        <label><input type="radio" name="collision severity" value="1" onChange={(event) => setsingleCollisionSeverity(event.target.value)} /> Fatal</label>
                        <label><input type="radio" name="collision severity" value="2" onChange={(event) => setsingleCollisionSeverity(event.target.value)} /> Injury (Severe)</label>
                        <label><input type="radio" name="collision severity" value="3" onChange={(event) => setsingleCollisionSeverity(event.target.value)} /> Injury (Other Visible)</label>
                        <label><input type="radio" name="collision severity" value="4" onChange={(event) => setsingleCollisionSeverity(event.target.value)} /> Injury (Complaint of Pain)</label>
                </div>
                <div className='selection'>
                    <h2>Crash Type: </h2>
                    <label><input type="checkbox" name="crash type" value="Head-on" onChange={handleCrashTypeChange} /> Head-On</label>
                    <label><input type="checkbox" name="crash type" value="Sideswipe" onChange={handleCrashTypeChange} /> Sideswipe</label>
                    <label><input type="checkbox" name="crash type" value="Rear end" onChange={handleCrashTypeChange} /> Rear End</label>
                    <label><input type="checkbox" name="crash type" value="Broadside" onChange={handleCrashTypeChange} /> Broadside</label>
                    <label><input type="checkbox" name="crash type" value="Hit Object" onChange={handleCrashTypeChange} /> Hit Object</label>
                    <label><input type="checkbox" name="crash type" value="Overturned" onChange={handleCrashTypeChange} /> Overturned</label>
                    <label><input type="checkbox" name="crash type" value="Vehicle/Pedestrian" onChange={handleCrashTypeChange} /> Vehicle/Pedestrian</label>
                    <label><input type="checkbox" name="crash type" value="Other" onChange={handleCrashTypeChange} /> Other</label>
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
