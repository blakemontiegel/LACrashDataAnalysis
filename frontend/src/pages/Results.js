import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Results = () => {
    const location = useLocation()
    const { data } = location.state || {}
    const { vehicleTypes } = data || {}
    const { fromQuery } = data || {}

    const isQuery1Page = fromQuery === 'query1'
    const isQuery2Page = fromQuery === 'query2'
    const isQuery3Page = fromQuery === 'query3'
    const isQuery4Page = fromQuery === 'query4'
    const isQuery5Page = fromQuery === 'query5'

    return (
        <div className='page'>
            <div className='page-text'>
                {isQuery1Page && (
                    <Link to='/query1'>
                        <span className="material-symbols-outlined" title='Back to Query 1 Page'>undo</span>
                    </Link> 
                )
                }
                {isQuery2Page && (
                    <Link to='/query2'>
                        <span className="material-symbols-outlined" title='Back to Query 2 Page'>undo</span>
                    </Link> 
                )}
                {isQuery3Page && (
                    <Link to='/query3'>
                        <span className="material-symbols-outlined" title='Back to Query 3 Page'>undo</span>
                    </Link> 
                )}
                {isQuery4Page && (
                    <Link to='/query4'>
                        <span className="material-symbols-outlined" title='Back to Query 4 Page'>undo</span>
                    </Link> 
                )}
                {isQuery5Page && (
                    <Link to='/query5'>
                        <span className="material-symbols-outlined" title='Back to Query 5 Page'>undo</span>
                    </Link> 
                )}
                <h1>Hi</h1>
                {vehicleTypes && (
                    <div>
                        <h2>Vehicle Types:</h2>
                        <ul>
                            {vehicleTypes.map((type, index) => (
                                <li key={index}>{type}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Results;
