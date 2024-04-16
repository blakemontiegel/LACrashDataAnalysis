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
            Evaluates how PCF violations, such as driving under the influence, have grown more or less common over time in Los Angeles county.
            </h2>
            </div>
            <div className='selection-container'>
                {
                <div className='selection'>
                <h2>PCF Violations: </h2>
                    <label><input type="checkbox" value="1" onChange={handlePCFViolationChange} /> Driving or Bicylcing Under the Influence of Alcohol or Drug</label>
                    <label><input type="checkbox" value="2" onChange={handlePCFViolationChange} /> Impeding Traffic</label>
                    <label><input type="checkbox" value="3" onChange={handlePCFViolationChange} /> Unsafe Speed</label>
                    <label><input type="checkbox" value="4" onChange={handlePCFViolationChange} /> Following Too Closely</label>
                    <label><input type="checkbox" value="5" onChange={handlePCFViolationChange} /> Wrong Side of Road</label>
                    <label><input type="checkbox" value="6" onChange={handlePCFViolationChange} /> Improper Passing</label>
                    <label><input type="checkbox" value="7" onChange={handlePCFViolationChange} /> Unsafe Lane Change</label>
                    <label><input type="checkbox" value="8" onChange={handlePCFViolationChange} /> Improper Turning</label>
                    <label><input type="checkbox" value="9" onChange={handlePCFViolationChange} /> Automobile Right of Way</label>
                    <label><input type="checkbox" value="10" onChange={handlePCFViolationChange} /> Pedestrian Right of Way</label>
                    <label><input type="checkbox" value="11" onChange={handlePCFViolationChange} /> Pedestrian Violation</label>
                    <label><input type="checkbox" value="12" onChange={handlePCFViolationChange} /> Traffic Signals and Signs</label>
                    <label><input type="checkbox" value="13" onChange={handlePCFViolationChange} /> Hazardous Parking</label>
                    <label><input type="checkbox" value="14" onChange={handlePCFViolationChange} /> Lights</label>
                    <label><input type="checkbox" value="15" onChange={handlePCFViolationChange} /> Brakes</label>
                    <label><input type="checkbox" value="16" onChange={handlePCFViolationChange} /> Other Equipment</label>
                    <label><input type="checkbox" value="17" onChange={handlePCFViolationChange} /> Other Hazardous Violation</label>
                    <label><input type="checkbox" value="18" onChange={handlePCFViolationChange} /> Other Than Driver (or Pedestrian)</label>
                    <label><input type="checkbox" value="21" onChange={handlePCFViolationChange} /> Unsafe Starting or Backing</label>
                    <label><input type="checkbox" value="22" onChange={handlePCFViolationChange} /> Other Improper Driving</label>
                    <label><input type="checkbox" value="23" onChange={handlePCFViolationChange} /> Pedestrian or Other Under the Influence of Alcohol or Drug</label>
                    <label><input type="checkbox" value="24" onChange={handlePCFViolationChange} /> Fell Asleep</label>
                    <label><input type="checkbox" value="0" onChange={handlePCFViolationChange} /> Unknown</label>
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
