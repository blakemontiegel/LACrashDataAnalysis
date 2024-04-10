import { useState } from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {

    return (
        <div className='page'>
            <div className='page-text'>
            <h1>
                Welcome to the Los Angeles County Vehicle Crash Data Analysis Application
            </h1>
            <h2>
                This application analyzes, identifies, interprets, and visualizes trends in Los Angeles country crash data
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
                    Determines and compares the influence of weather conditions on accidents involving user-specified vehicle types in Los Angeles between 2013 and 2022 considering: vehicle type, collision severity, and weather conditions.
                </p>
                </Link>
                </div>
                <div className='query'>
                <Link to='/query2' className="link" title='To Query 2 Page'>
                    <h2><u>Query 2</u></h2>
                <p>
                    Examines the relationship between crash severity levels (minor, moderate, severe, fatal) and types (rear-end, side-impact, pedestrian-involved etc.) in order to identify conditions that most frequently lead to severe outcomes.
                </p>
                </Link>
                </div>
                <div className='query'>
                <Link to='/query3' className="link" title='To Query 3 Page'>
                    <h2><u>Query 3</u></h2>
                <p>
                    Determines and compares the average number of people injured in crashes throughout the times of day in Los Angeles county between 2013 and 2022. Allows comparisons to be made across the number of parties involved and time of day.
                </p>
                </Link>
                </div>
                <div className='query'>
                <Link to='/query4' className="link" title='To Query 4 Page'>
                    <h2><u>Query 4</u></h2>
                <p>
                    Evaluates and compares the crash frequency and severity for different cities (or neighborhoods) within Los Angeles county have evolved between 2013 and 2022. In addition, allows that the frequency and severity of crashes be compared between the cities.
                </p>
                </Link>
                </div>
                <div className='query'>
                <Link to='/query5' className="link" title='To Query 5 Page'>
                    <h2><u>Query 5</u></h2>
                <p>
                    Evaluates how PCF violations such as the involvement of speeding, alcohol (DUI), following too closely, improper lane changes, and more have grown more or less frequent over time in Los Angeles county.
                </p>
                </Link>
                </div>
            </div>
            </div>
    )

}

export default Welcome