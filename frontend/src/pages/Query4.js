import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Query4 = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [collisionSeverity, setCollisionSeverity] = useState('')
    const [selectedCity1, setSelectedCity1] = useState('')
    const [selectedCity2, setSelectedCity2] = useState('')
    const [filteredCities1, setFilteredCities1] = useState([])
    const [filteredCities2, setFilteredCities2] = useState([])
    const [showDropdown1, setShowDropdown1] = useState(false)
    const [showDropdown2, setShowDropdown2] = useState(false)
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);

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

    const handleInputChange1 = (event) => {
        const inputText = event.target.value
        setSelectedCity1(inputText)
        const filtered = allCities.filter(city => 
            city.toLowerCase().includes(inputText.toLowerCase())
        )
        setFilteredCities1(filtered)
        setShowDropdown1(true)
    }

    const handleInputChange2 = (event) => {
        const inputText = event.target.value
        setSelectedCity2(inputText)
        const filtered = allCities.filter(city => 
            city.toLowerCase().includes(inputText.toLowerCase())
        )
        setFilteredCities2(filtered)
        setShowDropdown2(true)
    }

    const handleCitySelect1 = (city) => {
        setSelectedCity1(city)
        setShowDropdown1(false)
        setFilteredCities1([])
    }
    const handleCitySelect2 = (city) => {
        setSelectedCity2(city)
        setShowDropdown2(false)
        setFilteredCities2([])
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!collisionSeverity) {
            alert('Please select a collision severity.');
            return;
        }
        if (!selectedCity1) {
            alert('Please select a collision city.');
            return;
        }
        if (!selectedCity2) {
            alert('Please select a collision city.');
            return;
        }
        if(!allCities.includes(selectedCity1) || !allCities.includes(selectedCity2)) {
            alert('Please enter a valid city.');
            return;
        }
        if (!startDate || !endDate) {
            alert('Please fill in the time interval.');
            return;
        }

        const data = {
            startDate,
            endDate,
            collisionSeverity,
            selectedCity1,
            selectedCity2,
            fromQuery: 'query4'
        }
        setStartDate('')
        setEndDate('')
        setCollisionSeverity('')
        setSelectedCity1('')
        setSelectedCity2('')
        setFilteredCities1([])
        setFilteredCities2([])
        navigate('/result', {
            state: { data }
        }) 
    }

    const handleClickOutside1 = (event) => {
        if(inputRef1.current && !inputRef1.current.contains(event.target)) {
            setShowDropdown1(false);
        }
    }
    const handleClickOutside2 = (event) => {
        if(inputRef2.current && !inputRef2.current.contains(event.target)) {
            setShowDropdown2(false);
        }
    }

    useEffect(() => {
        setFilteredCities1(allCities);

        document.addEventListener("mousedown", handleClickOutside1)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside1)
        }
    }, [])

    useEffect(() => {
        setFilteredCities2(allCities);

        document.addEventListener("mousedown", handleClickOutside2)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside2)
        }
    }, [])

    return (
        <div className='page'>
            <div className='page-text'>
                <Link to='/'>
                <span className="material-symbols-outlined" title='Back to Welcome Page'>undo</span>
                </Link> 
            <h2>
                Evaluate and compare the crash frequency and severity for different cities (or neighborhoods) within Los Angeles county have evolved between 2013 and 2022. In addition, allow that the frequency and severity of crashes be compared between the cities.
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
                    <h2>Collision City 1: </h2>
                    <div ref={inputRef1}>
                        <input type="text" value={selectedCity1} onChange={handleInputChange1} placeholder='Type or select a city' onClick={() => setShowDropdown1(true)} className="city-input" />
                        {showDropdown1 && (
                            <ul className='city-dropdown'>
                                {filteredCities1.map((city, index) => (
                                    <li key={index} onClick={() => handleCitySelect1(city)}>{city}</li>
                                ))}
                            </ul>
                        )}
                </div>
                </div>
                <div className='selection'>
                    <h2>Collision City 2: </h2>
                    <div ref={inputRef2}>
                        <input type="text" value={selectedCity2} onChange={handleInputChange2} placeholder='Type or select a city' onClick={() => setShowDropdown2(true)} className="city-input" />
                        {showDropdown2 && (
                            <ul className='city-dropdown'>
                                {filteredCities2.map((city, index) => (
                                    <li key={index} onClick={() => handleCitySelect2(city)}>{city}</li>
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
