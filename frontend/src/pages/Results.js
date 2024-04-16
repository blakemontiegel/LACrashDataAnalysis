import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Results = () => {
    const location = useLocation()
    const { data } = location.state || {}
    const { vehicleTypes, collisionSeverities, singleCollisionSeverity, weatherCondition, fromQuery, startDate,
        endDate, crashType, initialTime, finalTime, selectedCity1, selectedCity2, pcfViolations } = data || {}

    const isQuery1Page = fromQuery === 'query1'
    const isQuery2Page = fromQuery === 'query2'
    const isQuery3Page = fromQuery === 'query3'
    const isQuery4Page = fromQuery === 'query4'
    const isQuery5Page = fromQuery === 'query5'

    const [graphData, setGraphData] = useState(null)

    const fetchGraphData = async () => {
        try {
            const vehicleTypesString = vehicleTypes.join(',')

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
                    crashType,
                    initialTime,
                    finalTime,
                    selectedCity1,
                    selectedCity2,
                    pcfViolations
                }),
            })
            if(!res.ok) {
                throw new Error('Failed to fetch graph data')
            }

            const imageData = await res.blob()
            setGraphData(URL.createObjectURL(imageData))
        } catch (error) {
            console.log('Error fetching graph data: ', error)
        }
    }

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
                                {singleCollisionSeverity}
                            </p>
                            <h3>-Weather Condition:</h3>
                            <p>
                                {weatherCondition}
                            </p>
                            <h3>-Time Frame: </h3>
                            <p>
                                {startDate} to {endDate}
                            </p>
                        </div> 
                    {/* GRAPH (replace with graph)*/}
                        <div className='graph-section'>
                            {graphData && <img src={graphData} alt='Graph'/>}
                        </div>
                    {/* Data represented in graph*/}
                        <div className='data-section'>
                            <h2>Data represented in the graph</h2>
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
                    <div className='selection-results-container'>
                    {/* Selected Conditions */}
                        <div className='selection-results'>
                            <h2>Selected Conditions: </h2>
                            <h3>-Collision Severity:</h3>
                            <p>
                                {collisionSeverities.map((type, index) => (
                                    <li key={index}>{type}</li>
                                ))}
                            </p>
                            <h3>-Crash Type:</h3>
                            <p>
                                {crashType}
                            </p>
                            <h3>-Time Frame: </h3>
                            <p>
                                {startDate} to {endDate}
                            </p>
                        </div> 
                    {/* GRAPH (replace with graph)*/}
                        <div className='selection-results-graph'>
                            <h1>GRAPH</h1>
                        </div>
                    {/* Data represented in graph*/}
                        <div className='selection-results'>
                            <h2>Data represented in the graph</h2>
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
                    <div className='selection-results-container'>
                    {/* Selected Conditions */}
                        <div className='selection-results'>
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
                        <div className='selection-results-graph'>
                            <h1>GRAPH</h1>
                        </div>
                    {/* Data represented in graph*/}
                        <div className='selection-results'>
                            <h2>Data represented in the graph</h2>
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
                    <div className='selection-results-container'>
                    {/* Selected Conditions */}
                        <div className='selection-results'>
                            <h2>Selected Conditions: </h2>
                            <h3>-Collision Severity:</h3>
                            <p>
                                {singleCollisionSeverity}
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
                        <div className='selection-results-graph'>
                            <h1>GRAPH</h1>
                        </div>
                    {/* Data represented in graph*/}
                        <div className='selection-results'>
                            <h2>Data represented in the graph</h2>
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
                    <div className='selection-results-container'>
                    {/* Selected Conditions */}
                        <div className='selection-results'>
                            <h2>Selected Conditions: </h2>
                            <h3>-PCF Violations:</h3>
                            <p>
                                {pcfViolations.map((type, index) => (
                                    <li key={index}>{type}</li>
                                ))}
                            </p>
                            <h3>-Time Frame: </h3>
                            <p>
                                {startDate} to {endDate}
                            </p>
                        </div> 
                    {/* GRAPH (replace with graph)*/}
                        <div className='selection-results-graph'>
                            <h1>GRAPH</h1>
                        </div>
                    {/* Data represented in graph*/}
                        <div className='selection-results'>
                            <h2>Data represented in the graph</h2>
                        </div>
                    </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Results;
