require('dotenv').config();

const express = require('express');
const oracle = require('oracledb');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser')
const { spawn } = require('child_process');

const app = express();

app.use(cors())
app.use(bodyParser.json());

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

app.post('/api/graphs', async (req, res) => {
    try {
        console.log('req body', req.body)

        const { vehicleTypes, collisionSeverities, singleCollisionSeverity, weatherCondition, fromQuery, startDate,
            endDate, crashType, initialTime, finalTime, selectedCity1, selectedCity2, pcfViolations } = req.body
            
            let pythonScriptPath;
            let scriptArgs = [startDate, endDate];
            
            if(fromQuery === 'query1') {
                pythonScriptPath = './Query1.py'
                scriptArgs.push(vehicleTypes, singleCollisionSeverity, weatherCondition)
                const imageData = await executePython(pythonScriptPath, scriptArgs)
            } /*else if(fromQuery === 'query2') {
                pythonScriptPath = './Query2.py'
                const scriptArgs = [startDate, endDate, collisionSeverities, crashType]
                const imageData = await executePython(scriptArgs)
            }else if(fromQuery === 'query3') {
                pythonScriptPath = './Query3.py'
                scriptArgs[startDate, endDate, initialTime, finalTime]
            }else if(fromQuery === 'query4') {
                pythonScriptPath = './Query4.py'
                scriptArgs[startDate, endDate, singleCollisionSeverity, selectedCity1, selectedCity2]
            }else if(fromQuery === 'query5') {
                pythonScriptPath = './Query5.py'
                scriptArgs[startDate, endDate, pcfViolations]
            }*/
    
            const pythonProcess = spawn('python', [pythonScriptPath, ...scriptArgs])

            pythonProcess.stdout.on('data', (data) => {
                res.send(data)
            })

            pythonProcess.stderr.on('data', (data) => {
                console.error('Error executing Python script: ${data}')
                res.status(500).json({error: 'Internal server error'})
            })

    } catch (error) {
        console.error('Error processing request: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.listen(process.env.PORT, () => {
    console.log('listening to port', process.env.PORT);
})