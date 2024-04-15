import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Query5 = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [pcfViolations, setPCFViolations] = useState([])

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value)
    }

    const handleEndDateChange = (event) => {
        const selectedEndDate = event.target.value;
        if (selectedEndDate >= startDate) {
            setEndDate(selectedEndDate)
        }
    }

    const handlePCFViolationChange = (event) => {
        const selectedPCFViolation = event.target.value
        setPCFViolations(prevViolations => {
            if (prevViolations.includes(selectedPCFViolation)) {
                return prevViolations.filter(violation => violation !== selectedPCFViolation)
            } else {
                return [...prevViolations, selectedPCFViolation]
            }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (pcfViolations.length === 0) {
            alert('Please select at least one pcf violation.');
            return;
        }

        const data = {
            startDate,
            endDate,
            pcfViolations,
            fromQuery: 'query5'
        }
        setStartDate('')
        setEndDate('')
        setPCFViolations([])
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
                Evaluate how PCF violations such as the involvement of speeding, alcohol (DUI), following too closely, improper lane changes, and more have grown more or less frequent over time in Los Angeles county.
            </h2>
            </div>
            <div className='selection-container'>
                {
                <div className='selection'>
                <h2>Collision Severity: </h2>
                    <label><input type="checkbox" value="Driving or Bicycling Under the Influence of Alcohol or Drug" onChange={handlePCFViolationChange} /> Driving or Bicycling Under the Influence of Alcohol or Drug</label>
                    <label><input type="checkbox" value="Impeding Traffic" onChange={handlePCFViolationChange} /> Impeding Traffic</label>
                    <label><input type="checkbox" value="Unsafe speed" onChange={handlePCFViolationChange} /> Unsafe Speed</label>
                    <label><input type="checkbox" value="Following Too Closely" onChange={handlePCFViolationChange} /> Following Too Closely</label>
                    <label><input type="checkbox" value="Wrong Side of Road" onChange={handlePCFViolationChange} /> Wrong Side of Road</label>
                    <label><input type="checkbox" value="Improper Passing" onChange={handlePCFViolationChange} /> Improper Passing</label>
                    <label><input type="checkbox" value="Unsafe Lange Change" onChange={handlePCFViolationChange} /> Unsafe Lane Change</label>
                    <label><input type="checkbox" value="Improper Turning" onChange={handlePCFViolationChange} /> Improper Turning</label>
                    <label><input type="checkbox" value="Automobile Right of Way" onChange={handlePCFViolationChange} /> Automobile Right of Way</label>
                    <label><input type="checkbox" value="Pedestrian Right of Way" onChange={handlePCFViolationChange} /> Pedestrian Right of Way</label>
                    <label><input type="checkbox" value="Pedestrian Violation" onChange={handlePCFViolationChange} /> Pedestrian Violation</label>
                    <label><input type="checkbox" value="Traffic Signals and Signs" onChange={handlePCFViolationChange} /> Traffic Signals and Signs</label>
                    <label><input type="checkbox" value="Hazardous Parking" onChange={handlePCFViolationChange} /> Hazardous Parking</label>
                    <label><input type="checkbox" value="Lights" onChange={handlePCFViolationChange} /> Lights</label>
                    <label><input type="checkbox" value="Brakes" onChange={handlePCFViolationChange} /> Brakes</label>
                    <label><input type="checkbox" value="Other Equipment" onChange={handlePCFViolationChange} /> Other Equipment</label>
                    <label><input type="checkbox" value="Other Hazardous Violation" onChange={handlePCFViolationChange} /> Other Hazardous Violation</label>
                    <label><input type="checkbox" value="Other Than Driver (or Pedestrian)" onChange={handlePCFViolationChange} /> Other Than Driver (or Pedestrian)</label>
                    <label><input type="checkbox" value="Unsafe Starting or Backing" onChange={handlePCFViolationChange} /> Unsafe Starting or Backing</label>
                    <label><input type="checkbox" value="Other Improper Driving" onChange={handlePCFViolationChange} /> Other Improper Driving</label>
                    <label><input type="checkbox" value="Pedestrian or Other Under the Influence of Alcohol or Drug" onChange={handlePCFViolationChange} /> Pedestrian or Other Under the Influence of Alcohol or Drug</label>
                    <label><input type="checkbox" value="Fell Asleep" onChange={handlePCFViolationChange} /> Fell Asleep</label>
                    <label><input type="checkbox" value="Unknown" onChange={handlePCFViolationChange} /> Unknown</label>
                </div>
                }
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

export default Query5;
