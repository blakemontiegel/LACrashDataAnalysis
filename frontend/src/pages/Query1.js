import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Query1 = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [vehicleTypes, setVehicleTypes] = useState([])
    const [singleCollisionSeverity, setSingleCollisionSeverity] = useState('')
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

        if (vehicleTypes.length === 0) {
            alert('Please select at least one vehicle type.');
            return;
        }
        if (!singleCollisionSeverity) {
            alert('Please select a collision severity.');
            return;
        }
        if (!weatherCondition) {
            alert('Please select a weather condition.');
            return;
        }
        if (!startDate || !endDate) {
            alert('Please fill in the time interval.');
            return;
        }

        const data = {
            startDate,
            endDate,
            vehicleTypes,
            singleCollisionSeverity,
            weatherCondition,
            fromQuery: 'query1'
        }
        setStartDate('')
        setEndDate('')
        setVehicleTypes('')
        setSingleCollisionSeverity('')
        setWeatherCondition('')
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
            Determines and compares the influence of weather conditions on accidents involving user-specified vehicle types considering vehicle type, collision severity, and weather conditions.
            </h2>
            </div>
            <div className='selection-container'>
                <div className='selection'>
                    <h2>Vehicle Type: </h2>
                    <label><input type="checkbox" value="Passenger Car/Station Wagon" onChange={handleVehicleTypeChange} /> Passenger Car/Station Wagon</label>
                    <label><input type="checkbox" value="Passenger Car with Trailer" onChange={handleVehicleTypeChange} /> Passenger Car with Trailer</label>
                    <label><input type="checkbox" value="Motorcycle/Scooter" onChange={handleVehicleTypeChange} /> Motorcycle/Scooter</label>
                    <label><input type="checkbox" value="Pickup or Panel Truck" onChange={handleVehicleTypeChange} /> Pickup or Panel Truck</label>
                    <label><input type="checkbox" value="Pickup or Panel Truck with Trailer" onChange={handleVehicleTypeChange} /> Pickup or Panel Truck with Trailer</label>
                    <label><input type="checkbox" value="Truck or Truck Tractor" onChange={handleVehicleTypeChange} /> Truck or Truck Tractor</label>
                    <label><input type="checkbox" value="Truck or Truck Tractor with Trailer" onChange={handleVehicleTypeChange} /> Truck or Truck Tractor with Trailer</label>
                    <label><input type="checkbox" value="Schoolbus" onChange={handleVehicleTypeChange} /> Schoolbus</label>
                    <label><input type="checkbox" value="Other Bus" onChange={handleVehicleTypeChange} /> Other Bus</label>
                    <label><input type="checkbox" value="Emergency Vehicle" onChange={handleVehicleTypeChange} /> Emergency Vehicle</label>
                    <label><input type="checkbox" value="Highway Construction Equipment" onChange={handleVehicleTypeChange} /> Highway Construction Equipment</label>
                    <label><input type="checkbox" value="Bicycle" onChange={handleVehicleTypeChange} /> Bicycle</label>
                    <label><input type="checkbox" value="Moped" onChange={handleVehicleTypeChange} /> Moped</label>
                    <label><input type="checkbox" value="Pedestrian" onChange={handleVehicleTypeChange} /> Pedestrian</label>
                    <label><input type="checkbox" value="Other Vehicle" onChange={handleVehicleTypeChange} /> Other Vehicle</label>
                </div>
                <div className='selection'>
                    <h2>Collision Severity: </h2>
                        <label><input type="radio" name="collision severity" value="1" onChange={(event) => setSingleCollisionSeverity(event.target.value)} /> Fatal</label>
                        <label><input type="radio" name="collision severity" value="2" onChange={(event) => setSingleCollisionSeverity(event.target.value)} /> Injury (Severe)</label>
                        <label><input type="radio" name="collision severity" value="3" onChange={(event) => setSingleCollisionSeverity(event.target.value)} /> Injury (Other Visible)</label>
                        <label><input type="radio" name="collision severity" value="4" onChange={(event) => setSingleCollisionSeverity(event.target.value)} /> Injury (Complaint of Pain)</label>
                </div>
                <div className='selection'>
                    <h2>Weather Conditions: </h2>
                    <label><input type="radio" name="weather" value="A" onChange={(event) => setWeatherCondition(event.target.value)} /> Clear</label>
                    <label><input type="radio" name="weather" value="B" onChange={(event) => setWeatherCondition(event.target.value)} /> Cloudy</label>
                    <label><input type="radio" name="weather" value="C" onChange={(event) => setWeatherCondition(event.target.value)} /> Raining</label>
                    <label><input type="radio" name="weather" value="D" onChange={(event) => setWeatherCondition(event.target.value)} /> Snowing</label>
                    <label><input type="radio" name="weather" value="E" onChange={(event) => setWeatherCondition(event.target.value)} /> Fog</label>
                    <label><input type="radio" name="weather" value="F" onChange={(event) => setWeatherCondition(event.target.value)} /> Wind</label>
                    <label><input type="radio" name="weather" value="G" onChange={(event) => setWeatherCondition(event.target.value)} /> Other</label>
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
