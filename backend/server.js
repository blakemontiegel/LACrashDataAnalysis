require('dotenv').config();

const express = require('express');
const oracle = require('oracledb');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser')
const path = require('path')
const { spawn } = require('child_process');
const { PythonShell } = require('python-shell') 

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '/QueryGraphImages')))

const executePython = async (pythonScriptPath, scriptArgs) => {

    const pythonProcess = spawn('python', [pythonScriptPath, ...scriptArgs])

    return new Promise((resolve, reject) => {
        let imageData = Buffer.from('')

        pythonProcess.stdout.on('data', (data) => {
            imageData = Buffer.concat([imageData, data])
        })

        pythonProcess.stderr.on('data', (data) => {
            console.error('Error executing Python script:', data.toString())
            reject(new Error('Error executing Python script'))
        })

        pythonProcess.on('close', (code) => {
            if(code === 0) {
                resolve(imageData)
            } else {
                reject(new Error(`Python script exited with code ${code}`))
            }
        })
    })

}


app.get('/api/tupleCount', (req, res) => {
    const pythonProcess = spawn('python', ['./TupleRequirement.py']);

    pythonProcess.stdout.on('data', (data) => {
        const tupleCount = data.toString().trim();
        res.json({ total_tuples: tupleCount });
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error('Error executing Python script:', data.toString());
        res.status(500).json({ error: 'Internal server error' });
    });
});

app.post('/api/graphs', async (req, res) => {
    try {
        console.log('req body', req.body)

        const { vehicleTypes, collisionSeverities, singleCollisionSeverity, weatherCondition, fromQuery, startDate,
            endDate, crashTypes, crashType, initialTime, finalTime, selectedCity1, selectedCity2, pcfViolations } = req.body
            
            let pythonScriptPath;
            let scriptArgs = []
            
            if(fromQuery === 'query1') {
                pythonScriptPath = './Query1.py'
                scriptArgs = [startDate, endDate, vehicleTypes, singleCollisionSeverity, weatherCondition]
            } else if(fromQuery === 'query2') {
                pythonScriptPath = './Query2.py'
                scriptArgs = [startDate, endDate, singleCollisionSeverity, crashTypes]
            }else if(fromQuery === 'query3') {
                pythonScriptPath = './Query3.py'
                scriptArgs[initialTime, finalTime]
            }else if(fromQuery === 'query4') {
                pythonScriptPath = './Query4.py'
                scriptArgs = [singleCollisionSeverity, selectedCity1, selectedCity2]
            }else if(fromQuery === 'query5') {
                pythonScriptPath = './Query5.py'
                scriptArgs = [pcfViolations]
            }
            const imageData = await executePython(pythonScriptPath, scriptArgs)

    } catch (error) {
        console.error('Error processing request: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.listen(process.env.PORT, () => {
    console.log('listening to port', process.env.PORT);
})