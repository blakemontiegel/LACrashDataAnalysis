import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Welcome = () => {
    const [tupleCount, setTupleCount] = useState('')

    const handleClick = async () => {
        try {
            const response = await axios.get('/api/tupleCount')
            setTupleCount(response.data)
        } catch (error) {
            console.error('Error retrieving tuple count', error)
        }
    }
    return (
        <div className='page'>
            <div className='page-text'>
            {tupleCount ? (
                <p>There are {tupleCount} tuples in the database</p>
            ) : (
                <span className="material-symbols-outlined" title='Check Tuple Count'>info</span>
            )}
                

            <h1>
                Welcome to the Los Angeles County Vehicle Crash Data Analysis Application
            </h1>
            <h2>
                Analyzes, identifies, interprets, and visualizes trends in Los Angeles country crash data from 2013 to 2022
            </h2>
            <h3>
                <b>
                    Select a Query to Begin
                </b>
            </h3>
            </div>
            <div className='queries-container'>
                <div className='query'>
                <Link to='/query1' className="link" title='To Query 1 Page'>
                    <h2><u>Query 1</u></h2>
                <p>
                    Determines and compares the influence of weather conditions on accidents involving user-specified vehicle types considering vehicle type, collision severity, and weather conditions.
                </p>
                </Link>
                </div>
                <div className='query'>
                <Link to='/query2' className="link" title='To Query 2 Page'>
                    <h2><u>Query 2</u></h2>
                <p>
                    Examines the relationship between crash severity levels and crash types in order to identify conditions that most frequently lead to severe outcomes.
                </p>
                </Link>
                </div>
                <div className='query'>
                <Link to='/query3' className="link" title='To Query 3 Page'>
                    <h2><u>Query 3</u></h2>
                <p>
                    Determines and compares the average number of people injured in crashes throughout the times of day. Allows comparisons to be made across the number of parties involved and time of day.
                </p>
                </Link>
                </div>
                <div className='query'>
                <Link to='/query4' className="link" title='To Query 4 Page'>
                    <h2><u>Query 4</u></h2>
                <p>
                    Evaluates and compares the crash frequency and severity for different cities within Los Angeles county. Allows that the frequency and severity of crashes be compared between the cities.
                </p>
                </Link>
                </div>
                <div className='query'>
                <Link to='/query5' className="link" title='To Query 5 Page'>
                    <h2><u>Query 5</u></h2>
                <p>
                    Evaluates how PCF violations, such as driving under the influence, have grown more or less common over time in Los Angeles county.
                </p>
                </Link>
                </div>
            </div>
            </div>
    )

}

export default Welcome