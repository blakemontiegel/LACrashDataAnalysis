import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Query1 = () => {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [vehicleTypes, setVehicleTypes] = useState([])
    const [collisionSeverities, setCollisionSeverities] = useState([])
    const [weatherConditions, setWeatherConditions] = useState([])

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value)
    }

    const handleEndDateChange = (event) => {
        const selectedEndDate = event.target.value;
        if (selectedEndDate >= startDate) {
            setEndDate(selectedEndDate)
        }
    }

    const handleVehicleTypeChange = (event) => {
        const selectedVehicleType = event.target.value
        setVehicleTypes(prevTypes => {
            if (prevTypes.includes(selectedVehicleType)) {
                return prevTypes.filter(type => type !== selectedVehicleType)
            } else {
                return [...prevTypes, selectedVehicleType];
            }
        })
    }

    const handleCollisionSeverityChange = (event) => {
        const selectedCollisionSeverity = event.target.value
        setCollisionSeverities(prevSeverities => {
            if (prevSeverities.includes(selectedCollisionSeverity)) {
                return prevSeverities.filter(severity => severity !== selectedCollisionSeverity)
            } else {
                return [...prevSeverities, selectedCollisionSeverity]
            }
        })
    }

    const handleWeatherConditionChange = (event) => {
        const selectedWeatherCondition = event.target.value
        setWeatherConditions(prevConditions => {
            if (prevConditions.includes(selectedWeatherCondition)) {
                return prevConditions.filter(condition => condition !== selectedWeatherCondition)
            } else {
                return [...prevConditions, selectedWeatherCondition]
            }
        })
    }

    const handleSubmit = async (event) => {
        console.log('--Selected Vehicle Types')
        if(vehicleTypes) {
            vehicleTypes.forEach((value) => {
                console.log(value)
            })
        }else {
            console.log('No Vehicles Selected')
        }
    }

    return (
        <div className='page'>
            <div className='page-text'>
                <Link to='/welcome'>
                <span className="material-symbols-outlined" title='Back to Welcome Page'>undo</span>
                </Link> 
            <h1>
                Determines and compares the influence of weather conditions on accidents involving user-specified vehicle types in Los Angeles between 2013 and 2022 considering: vehicle type, collision severity, and weather conditions.
            </h1>
            </div>
            <div className='selection-container'>
                <div className='selection'>
                    <h2>Vehicle Type: </h2>
                    <label><input type="checkbox" value="car" onChange={handleVehicleTypeChange} /> Car</label>
                    <label><input type="checkbox" value="truck" onChange={handleVehicleTypeChange} /> Truck</label>
                    <label><input type="checkbox" value="motorcycle" onChange={handleVehicleTypeChange} /> Motorcycle</label>
                    {/* Add more checkboxes for other vehicle types */}
                </div>
                <div className='selection'>
                    <h2>Collision Severity: </h2>
                    <label><input type="checkbox" value="minor" onChange={handleCollisionSeverityChange} /> Minor</label>
                    <label><input type="checkbox" value="moderate" onChange={handleCollisionSeverityChange} /> Moderate</label>
                    <label><input type="checkbox" value="severe" onChange={handleCollisionSeverityChange} /> Severe</label>
                    <label><input type="checkbox" value="fatal" onChange={handleCollisionSeverityChange} /> Fatal</label>
                    {/* Add more checkboxes for other collision severities */}
                </div>
                <div className='selection'>
                    <h2>Weather Conditions: </h2>
                    <label><input type="checkbox" value="sunny" onChange={handleWeatherConditionChange} /> Sunny</label>
                    <label><input type="checkbox" value="rainy" onChange={handleWeatherConditionChange} /> Rainy</label>
                    <label><input type="checkbox" value="cloudy" onChange={handleWeatherConditionChange} /> Cloudy</label>
                    <label><input type="checkbox" value="foggy" onChange={handleWeatherConditionChange} /> Foggy</label>
                    {/* Add more checkboxes for other weather conditions */}
                </div>
                <div className='time-interval-container selection'>
                <h2>Time Interval: </h2>
                <div>
                    <label htmlFor="start-date">Start Date:</label>
                    <input type="date" id="start-date" name="start-date" value={startDate} onChange={handleStartDateChange} />
                </div>
                <div>
                    <label htmlFor="end-date">End Date:</label>
                    <input type="date" id="end-date" name="end-date" value={endDate} onChange={handleEndDateChange} min={startDate} />
                </div>
            </div>
            </div>
                <button className='button' onClick={handleSubmit}>Generate Results</button>
        </div>
    )
}

export default Query1;
