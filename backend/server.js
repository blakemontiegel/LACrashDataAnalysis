require('dotenv').config();

const express = require('express');
const oracle = require('oracledb');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors())



app.get('/api/graphs', (req, res) => {
    const { vehicleTypes, collisionSeverities, singleCollisionSeverity, weatherCondition, fromQuery, startDate,
        endDate, crashType, initialTime, finalTime, selectedCity1, selectedCity2, pcfViolations } = req.query;

        let pythonScriptPath;
        let scriptArgs = [];
        /*const parsedVehicleTypes = JSON.parse(vehicleTypes);
        const parsedPcfViolations = JSON.parse(pcfViolations);
        const parsedCollisionSeverities = JSON.parse(collisionSeverities);*/

        if(fromQuery === 'query1') {
            pythonScriptPath = './Query1.py';
            scriptArgs[startDate, endDate, vehicleTypes, singleCollisionSeverity, weatherCondition];
        }else if(fromQuery === 'query2') {
            //pythonScriptPath = 'path/to/query2_script.py';
            scriptArgs[startDate, endDate, collisionSeverities, crashType];
        }else if(fromQuery === 'query3') {
            //pythonScriptPath = 'path/to/query3_script.py';
            scriptArgs[startDate, endDate, initialTime, finalTime];
        }else if(fromQuery === 'query4') {
            //pythonScriptPath = 'path/to/query4_script.py';
            scriptArgs[startDate, endDate, singleCollisionSeverity, selectedCity1, selectedCity2];
        }else if(fromQuery === 'query5') {
            //pythonScriptPath = 'path/to/query5_script.py';
            scriptArgs[startDate, endDate, pcfViolations];
        }

        const pythonProcess = spawn('python', [pythonScriptPath, ...scriptArgs]);

        pythonProcess.stdout('data', (data) => {
            res.send(data);
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error('Error executing Python script: ${data}');
            res.status(500).json({error: 'Internal server error'});
        });
});

app.listen(process.env.PORT, () => {
    console.log('listening to port', process.env.PORT);
})