import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Results = () => {
    const location = useLocation()
    const { data } = location.state || {}
    const { vehicleTypes, collisionSeverities, singleCollisionSeverity, weatherCondition, fromQuery, startDate,
        endDate, crashTypes, crashType, initialTime, finalTime, selectedCity1, selectedCity2, pcfViolations } = data || {}

    var weatherConditionsDict = {
        'A': "Clear",
        'B': "Cloudy",
        'C': "Raining",
        'D': "Snowing",
        'E': "Fog",
        'F': "Other",
        'G': "Wind"
    }

    var collisionSeverityDict = {
        '1': "Fatal",
        '2': "Injury (Severe)",
        '3': "Injury (Other Visible)",
        '4': "Injury (Complaint of Pain)"
    }

    var pcfViolationDict = {
                    "1" : "Driving or Bicylcing Under the Influence of Alcohol or Drug",
                    "2" : "Impeding Traffic",
                    "3" : "Unsafe Speed",
                    "4" : "Following Too Closely",
                    "5" : "Wrong Side of Road",
                    "6" : "Improper Passing",
                    "7" : "Unsafe Lane Change",
                    "8" : "Improper Turning",
                    "9" : "Automobile Right of Way",
                    "10": "Pedestrian Right of Way",
                    "11": "Pedestrian Violation",
                    "12": "Traffic Signals and Signs",
                    "13": "Hazardous Parking",
                    "14": "Lights",
                    "15": "Brakes",
                    "16": "Other Equipment",
                    "17": "Other Hazardous Violation",
                    "18": "Other Than Driver (or Pedestrian)",
                    "21": "Unsafe Starting or Backing",
                    "22": "Other Improper Driving",
                    "23": "Pedestrian or Other Under the Influence of Alcohol or Drug",
                    "24": "Fell Asleep",
                    "0" : "Unknown"
    }

    const isQuery1Page = fromQuery === 'query1'
    const isQuery2Page = fromQuery === 'query2'
    const isQuery3Page = fromQuery === 'query3'
    const isQuery4Page = fromQuery === 'query4'
    const isQuery5Page = fromQuery === 'query5'

    const [graphData, setGraphData] = useState(null)

    const fetchGraphData = async () => {
        try {
            const vehicleTypesString = vehicleTypes ? vehicleTypes.join(',') : '';
            const crashTypesString = crashTypes ? crashTypes.join(',') : '';
            const pcfViolationsString = pcfViolations ? pcfViolations.join(',') : '';

            const res = await fetch('/api/graphs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    vehicleTypes: vehicleTypesString,
                    collisionSeverities,
                    singleCollisionSeverity,
                    weatherCondition,
                    fromQuery,
                    startDate,
                    endDate,
                    crashTypes: crashTypesString,
                    crashType,
                    initialTime,
                    finalTime,
                    selectedCity1,
                    selectedCity2,
                    pcfViolations: pcfViolationsString
                }),
            })
            if(!res.ok) {
                throw new Error('Failed to fetch graph data')
            }

            const imageData = await res.blob()
            setGraphData('/QueryGraphImages')
        } catch (error) {
            console.log('Error fetching graph data: ', error)
        }
    }

    useEffect(() => {
        fetchGraphData()
        if(fromQuery === "query1") {
        const fetchImage = async () => {
            try {
                const response = await fetch('images/Query1Result.png'); // Replace with your backend URL
                if (!response.ok) {
                    throw new Error('Failed to fetch image');
                }
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setGraphData(url);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
        return () => {
            if (graphData) {
                URL.revokeObjectURL(graphData);
            }
        };
        }
        if(fromQuery === "query2") {
            const fetchImage = async () => {
                try {
                    const response = await fetch('/images/Query2Result.png'); // Replace with your backend URL
                    if (!response.ok) {
                        throw new Error('Failed to fetch image');
                    }
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    setGraphData(url);
                } catch (error) {
                    console.error('Error fetching image:', error);
                }
            };
    
            fetchImage();
            return () => {
                if (graphData) {
                    URL.revokeObjectURL(graphData);
                }
            };
        }
    }, [])

    return (
        <div className='page'>
            <div className='page-text'>
                {isQuery1Page && (
                    <>
                    <Link to='/query1'>
                        <span className="material-symbols-outlined" title='Back to Query 1 Page'>undo</span>
                    </Link>
                    <div className='page-text'>
                        <h2>
                        Determines and compares the influence of weather conditions on accidents involving user-specified vehicle types in Los Angeles between 2013 and 2022 considering: vehicle type, collision severity, and weather conditions.
                        </h2>
                    </div>
                    <div className='results-page'>
                    {/* Selected Conditions */}
                        <div className='selected-conditions'>
                            <h2>Selected Conditions: </h2>
                            <h3>-Vehicle Types:</h3>
                            <p>
                                {vehicleTypes.map((type, index) => (
                                    <li key={index}>{type}</li>
                                ))}
                            </p>
                            <h3>-Collision Severity:</h3>
                            <p>
                                {collisionSeverityDict[singleCollisionSeverity]}
                            </p>
                            <h3>-Weather Condition:</h3>
                            <p>
                                {weatherConditionsDict[weatherCondition]}
                            </p>
                            <h3>-Time Frame: </h3>
                            <p>
                                {startDate} to {endDate}
                            </p>
                        </div> 
                    {/* GRAPH (replace with graph)*/}
                        <div className='graph-section'>
                            <img src={graphData} alt="Graph 1"/>
                        </div>
                    </div>
                    </>
                )
                }
                {isQuery2Page && (
                    <>
                    <Link to='/query2'>
                        <span className="material-symbols-outlined" title='Back to Query 2 Page'>undo</span>
                    </Link>
                    <div className='page-text'>
                        <h2>
                        Examine the relationship between crash severity levels (minor, moderate, severe, fatal) and types (rear-end, side-impact, pedestrian-involved etc.) in order to identify conditions that most frequently lead to severe outcomes.
                        </h2>
                    </div>
                    <div className='results-page'>
                    {/* Selected Conditions */}
                        <div className='selected-conditions'>
                            <h2>Selected Conditions: </h2>
                            <h3>-Collision Severity:</h3>
                            <p>
                                {collisionSeverityDict[singleCollisionSeverity]}
                            </p>
                            <h3>-Crash Type:</h3>
                            <p>
                                {crashTypes.map((type, index) => (
                                    <li key={index}>{type}</li>
                                ))}
                            </p>
                            <h3>-Time Frame: </h3>
                            <p>
                                {startDate} to {endDate}
                            </p>
                        </div> 
                    {/* GRAPH (replace with graph)*/}
                        <div className='graph-section'>
                            <img src={graphData} alt="Graph 2"/>
                        </div>
                    </div>
                    </>
                )}
                {isQuery3Page && (
                    <>
                    <Link to='/query3'>
                        <span className="material-symbols-outlined" title='Back to Query 3 Page'>undo</span>
                    </Link>
                    <div className='page-text'>
                        <h2>
                        Determine and compare the average number of people injured in crashes throughout the times of day in Los Angeles county between 2013 and 2022. Allow comparisons to be made across the number of parties involved and time of day.
                        </h2>
                    </div>
                    <div className='results-page'>
                    {/* Selected Conditions */}
                        <div className='selected-conditions'>
                            <h2>Selected Conditions: </h2>
                            <h3>-Collision Time:</h3>
                            <p>
                                {initialTime} to {finalTime}
                            </p>
                            <h3>-Time Frame: </h3>
                            <p>
                                {startDate} to {endDate}
                            </p>
                        </div> 
                    {/* GRAPH (replace with graph)*/}
                        <div className='graph-section'>
                            <h1>GRAPH</h1>
                        </div>
                    </div>
                    </>
                )}
                {isQuery4Page && (
                    <>
                    <Link to='/query4'>
                        <span className="material-symbols-outlined" title='Back to Query 4 Page'>undo</span>
                    </Link>
                    <div className='page-text'>
                        <h2>
                        Evaluate and compare the crash frequency and severity for different cities (or neighborhoods) within Los Angeles county have evolved between 2013 and 2022. In addition, allow that the frequency and severity of crashes be compared between the cities.
                        </h2>
                    </div>
                    <div className='results-page'>
                    {/* Selected Conditions */}
                        <div className='selected-conditions'>
                            <h2>Selected Conditions: </h2>
                            <h3>-Collision Severity:</h3>
                            <p>
                                {collisionSeverityDict[singleCollisionSeverity]}
                            </p>
                            <h3>-Collision City:</h3>
                            <p>
                                {selectedCity1} and {selectedCity2}
                            </p>
                            <h3>-Time Frame: </h3>
                            <p>
                                {startDate} to {endDate}
                            </p>
                        </div> 
                    {/* GRAPH (replace with graph)*/}
                        <div className='graph-section'>
                            <h1>GRAPH</h1>
                        </div>
                    </div>
                    </>
                )}
                {isQuery5Page && (
                    <>
                    <Link to='/query5'>
                        <span className="material-symbols-outlined" title='Back to Query 5 Page'>undo</span>
                    </Link>
                    <div className='page-text'>
                        <h2>
                        Evaluate how PCF violations such as the involvement of speeding, alcohol (DUI), following too closely, improper lane changes, and more have grown more or less frequent over time in Los Angeles county.
                        </h2>
                    </div>
                    <div className='results-page'>
                    {/* Selected Conditions */}
                        <div className='selected-conditions'>
                            <h2>Selected Conditions: </h2>
                            <h3>-PCF Violations:</h3>
                            <p>
                                {pcfViolations.map((type, index) => (
                                    <li key={index}>{pcfViolationDict[type]}</li>
                                ))}
                            </p>
                            <h3>-Time Frame: </h3>
                            <p>
                                {startDate} to {endDate}
                            </p>
                        </div> 
                    {/* GRAPH (replace with graph)*/}
                        <div className='graph-section'>
                            <h1>GRAPH</h1>
                        </div>
                    </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Results;
