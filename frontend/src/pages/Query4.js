import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Query4 = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [collisionSeverity, setCollisionSeverity] = useState('')
    const [selectedCity, setSelectedCity] = useState('')
    const [filteredCities, setFilteredCities] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)
    const inputRef = useRef(null);

    const allCities = [
        "Alhambra", "Agoura Hills", "Arcadia", "Artesia", "Avalon", "Azusa", "Baldwin Park", "Bell", "Bell Gardens", "Bellflower",
        "Beverly Hills", "Bradbury", "Burbank", "Calabasas", "Carson", "Cerritos", "Claremont", "Commerce", "Compton", "Covina",
        "Cudahy", "Culver City", "Diamond Bar", "Downey", "Duarte", "El Monte", "El Segundo", "Gardena", "Glendale", "Glendora",
        "Hawaiian Gardens", "Hawthorne", "Hermosa Beach", "Hidden Hills", "Huntington Park", "Industry", "Inglewood", "Irwindale",
        "La Canada Flintridge", "La Habra Heights", "La Mirada", "La Puente", "La Verne", "Lakewood", "Lancaster", "Lawndale",
        "Lomita", "Long Beach", "Los Angeles", "Lynwood", "Malibu", "Manhattan Beach", "Maywood", "Monrovia", "Montebello",
        "Monterey Park", "Norwalk", "Palmdale", "Palos Verdes Estates", "Paramount", "Pasadena", "Pico Rivera", "Pomona",
        "Rancho Palos Verdes", "Redondo Beach", "Rolling Hills", "Rolling Hills Estates", "Rosemead", "San Dimas", "San Fernando",
        "San Gabriel", "San Marino", "Santa Clarita", "Santa Fe Springs", "Santa Monica", "Sierra Madre", "Signal Hill",
        "South El Monte", "South Gate", "South Pasadena", "Temple City", "Torrance", "Vernon", "Walnut", "West Covina",
        "West Hollywood", "Westlake Village", "Whittier"
    ]
    

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value)
    }

    const handleEndDateChange = (event) => {
        const selectedEndDate = event.target.value;
        if (selectedEndDate >= startDate) {
            setEndDate(selectedEndDate)
        }
    }

    const handleInputChange = (event) => {
        const inputText = event.target.value
        setSelectedCity(inputText)
        const filtered = allCities.filter(city => 
            city.toLowerCase().includes(inputText.toLowerCase())
        )
        setFilteredCities(filtered)
        setShowDropdown(true)
    }

    const handleCitySelect = (city) => {
        setSelectedCity(city)
        setShowDropdown(false)
        setFilteredCities([])
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            startDate,
            endDate,
            collisionSeverity,
            fromQuery: 'query4'
        }
        setStartDate('')
        setEndDate('')
        setCollisionSeverity('')
        setSelectedCity('')
        setFilteredCities([])
        navigate('/result', {
            state: { data }
        }) 
    }

    const handleClickOutside = (event) => {
        if(inputRef.current && !inputRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    }

    useEffect(() => {
        setFilteredCities(allCities);

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className='page'>
            <div className='page-text'>
                <Link to='/welcome'>
                <span className="material-symbols-outlined" title='Back to Welcome Page'>undo</span>
                </Link> 
            <h2>
                Evaluate and compare the crash frequency and severity for different cities (or neighborhoods) within Los Angeles county have evolved between 2013 and 2022. In addition, allow that the frequency and severity of crashes be compared between the cities.
            </h2>
            </div>
            <div className='selection-container'>
                <div className='selection'>
                <h2>Collision Severity: </h2>
                    <label><input type="radio" value="1" onChange={(event) => setCollisionSeverity(event.target.value)} /> Fatal</label>
                    <label><input type="radio" value="2" onChange={(event) => setCollisionSeverity(event.target.value)} /> Injury (Severe)</label>
                    <label><input type="radio" value="3" onChange={(event) => setCollisionSeverity(event.target.value)} /> Injury (Other Visible)</label>
                    <label><input type="radio" value="4" onChange={(event) => setCollisionSeverity(event.target.value)} /> Injury (Complaint of Pain)</label>
                </div>
                <div className='selection'>
                    <h2>Collision City: </h2>
                    <div ref={inputRef}>
                        <input type="text" value={selectedCity} onChange={handleInputChange} placeholder='Type or select a city' onClick={() => setShowDropdown(true)} className="city-input" />
                        {showDropdown && (
                            <ul className='city-dropdown'>
                                {filteredCities.map((city, index) => (
                                    <li key={index} onClick={() => handleCitySelect(city)}>{city}</li>
                                ))}
                            </ul>
                        )}
                        
                    </div>
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

export default Query4;
