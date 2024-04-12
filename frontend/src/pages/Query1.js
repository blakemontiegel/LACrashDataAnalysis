import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Query1 = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [vehicleTypes, setVehicleTypes] = useState([])
    const [collisionSeverity, setCollisionSeverity] = useState('')
    const [weatherCondition, setWeatherCondition] = useState('')

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            startDate,
            endDate,
            vehicleTypes,
            collisionSeverity,
            weatherCondition,
            fromQuery: 'query1'
        }
        setStartDate('')
        setEndDate('')
        setVehicleTypes('')
        setCollisionSeverity('')
        setWeatherCondition('')
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
                Determines and compares the influence of weather conditions on accidents involving user-specified vehicle types in Los Angeles between 2013 and 2022 considering: vehicle type, collision severity, and weather conditions.
            </h2>
            </div>
            <div className='selection-container'>
                <div className='selection'>
                    <h2>Vehicle Type: </h2>
                    <label><input type="checkbox" value="A" onChange={handleVehicleTypeChange} /> Passenger Car/Station Wagon</label>
                    <label><input type="checkbox" value="B" onChange={handleVehicleTypeChange} /> Passenger Car with Trailer</label>
                    <label><input type="checkbox" value="C" onChange={handleVehicleTypeChange} /> Motorcycle/Scooter</label>
                    <label><input type="checkbox" value="D" onChange={handleVehicleTypeChange} /> Pickup or Panel Truck</label>
                    <label><input type="checkbox" value="E" onChange={handleVehicleTypeChange} /> Pickup or Panel Truck with Trailer</label>
                    <label><input type="checkbox" value="F" onChange={handleVehicleTypeChange} /> Truck or Truck Tractor</label>
                    <label><input type="checkbox" value="G" onChange={handleVehicleTypeChange} /> Truck or Truck Tractor with Trailer</label>
                    <label><input type="checkbox" value="H" onChange={handleVehicleTypeChange} /> Schoolbus</label>
                    <label><input type="checkbox" value="I" onChange={handleVehicleTypeChange} /> Other Bus</label>
                    <label><input type="checkbox" value="J" onChange={handleVehicleTypeChange} /> Emergency Vehicle</label>
                    <label><input type="checkbox" value="K" onChange={handleVehicleTypeChange} /> Highway Construction Equipment</label>
                    <label><input type="checkbox" value="L" onChange={handleVehicleTypeChange} /> Bicycle</label>
                    <label><input type="checkbox" value="O" onChange={handleVehicleTypeChange} /> Moped</label>
                    <label><input type="checkbox" value="N" onChange={handleVehicleTypeChange} /> Pedestrian</label>
                    <label><input type="checkbox" value="M" onChange={handleVehicleTypeChange} /> Other Vehicle</label>
                </div>
                <div className='selection'>
                    <h2>Collision Severity: </h2>
                        <label><input type="radio" value="1" onChange={(event) => setCollisionSeverity(event.target.value)} /> Fatal</label>
                        <label><input type="radio" value="2" onChange={(event) => setCollisionSeverity(event.target.value)} /> Injury (Severe)</label>
                        <label><input type="radio" value="3" onChange={(event) => setCollisionSeverity(event.target.value)} /> Injury (Other Visible)</label>
                        <label><input type="radio" value="4" onChange={(event) => setCollisionSeverity(event.target.value)} /> Injury (Complaint of Pain)</label>
                </div>
                <div className='selection'>
                    <h2>Weather weatherConditions: </h2>
                    <label><input type="radio" value="A" onChange={(event) => setWeatherCondition(event.target.value)} /> Clear</label>
                    <label><input type="radio" value="B" onChange={(event) => setWeatherCondition(event.target.value)} /> Cloudy</label>
                    <label><input type="radio" value="C" onChange={(event) => setWeatherCondition(event.target.value)} /> Raining</label>
                    <label><input type="radio" value="D" onChange={(event) => setWeatherCondition(event.target.value)} /> Snowing</label>
                    <label><input type="radio" value="E" onChange={(event) => setWeatherCondition(event.target.value)} /> Fog</label>
                    <label><input type="radio" value="G" onChange={(event) => setWeatherCondition(event.target.value)} /> Wind</label>
                    <label><input type="radio" value="F" onChange={(event) => setWeatherCondition(event.target.value)} /> Other</label>
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

export default Query1;
