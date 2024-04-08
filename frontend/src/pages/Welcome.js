import { useState } from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {

    return (
        <div className='welcome-page'>
            <h1>
                Welcome to the Los Angeles County Vehicle Crash Data Analysis Application
            </h1>
            <h2>
                This application analyzes, identifies, interprets, and visualizes trends in Los Angeles country crash data
            </h2>
            <h3>
                <u>
                    Select a Query to Begin
                </u>
            </h3>
        </div>
    )

}

export default Welcome