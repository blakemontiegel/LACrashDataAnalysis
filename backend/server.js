require('dotenv').config();

const express = require('express');
const oracle = require('oracledb');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/api/graphs', (req, res) => {
    const { vehicleTypes, collisionSeverities, singleCollisionSeverity, weatherCondition, fromQuery, startDate,
        endDate, crashType, initialTime, finalTime, selectedCity1, selectedCity2, pcfViolations } = req.query;

        let pythonScriptPath;
        let scriptArgs = [];
        const parsedVehicleTypes = JSON.parse(vehicleTypes);
        const parsedPcfViolations = JSON.parse(pcfViolations);
        const parsedCollisionSeverities = JSON.parse(collisionSeverities);

        if(fromQuery === 'query1') {
            //pythonScriptPath = 'path/to/query1_script.py';
            scriptArgs[startDate, endDate, parsedVehicleTypes, singleCollisionSeverity, weatherCondition];
        }else if(fromQuery === 'query2') {
            //pythonScriptPath = 'path/to/query2_script.py';
            scriptArgs[startDate, endDate, parsedCollisionSeverities, crashType];
        }else if(fromQuery === 'query3') {
            //pythonScriptPath = 'path/to/query3_script.py';
            scriptArgs[startDate, endDate, parsedVehicleTypes, initialTime, finalTime];
        }else if(fromQuery === 'query4') {
            //pythonScriptPath = 'path/to/query4_script.py';
            scriptArgs[startDate, endDate, singleCollisionSeverity, selectedCity1, selectedCity2];
        }else if(fromQuery === 'query5') {
            //pythonScriptPath = 'path/to/query5_script.py';
            scriptArgs[startDate, endDate, parsedPcfViolations];
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

/*async function initDatabase() {
    const dbConfig = {
        user: 'zhouxiangyu',
        password: 'p0WhwSbo4P7ROmyZ0c3eszbM',
        connectString: 'oracle.cise.ufl.edu:1521/orcl'
    };
    let connection;
    try {
        connection = await oracle.getConnection(dbConfig);
        console.log('Connect successfully!');
        await connection.execute('DROP TABLE Crashes');
        // await connection.execute('DROP TABLE InvolvedParties');
        // await connection.execute('DROP TABLE Victims');
        await connection.execute('CREATE TABLE Crashes\n' +
            '    (CaseID INTEGER NOT NULL,\n' +
            '    CrashDate DATE,\n' +
            '    CrashTime TIMESTAMP,\n' +
            '    WeatherCondition1 VARCHAR2(10),\n' +
            '    WeatherCondition2 VARCHAR2(10),\n' +
            '    CollisionSeverity INTEGER,\n' +
            '    NumberInjured INTEGER,\n' +
            '    ViolationCategory VARCHAR2(60),\n' +
            '    CollisionType VARCHAR2(20),\n' +
            '    City VARCHAR2(20),\n' +
            '    PRIMARY KEY (CaseID))');
        await connection.execute('CREATE TABLE InvolvedParties\n' +
            '    (CaseID INTEGER NOT NULL,\n' +
            '    PartyNumber INTEGER NOT NULL,\n' +
            '    PartyType VARCHAR2(30),\n' +
            '    AtFault CHAR(1),\n' +
            '    VehicleType VARCHAR2(40),\n' +
            '    PRIMARY KEY (PartyNumber),\n' +
            '    FOREIGN KEY (CaseID) REFERENCES Crashes(CaseID))');
        await connection.execute('CREATE TABLE Victims\n' +
            '    (CaseID INTEGER NOT NULL,\n' +
            '    PartyNumber INTEGER NOT NULL,\n' +
            '    VictimNumber INTEGER NOT NULL,\n' +
            '    VictimRole VARCHAR2(20),\n' +
            '    Gender CHAR(1),\n' +
            '    Age INTEGER,\n' +
            '    DegreeOfInjury VARCHAR2(30),\n' +
            '    SafetyEquipment1 VARCHAR2(40),\n' +
            '    SafetyEquipment2 VARCHAR2(40),\n' +
            '    PRIMARY KEY (VictimNumber),\n' +
            '    FOREIGN KEY (CaseID) REFERENCES Crashes(CaseID),\n' +
            '    FOREIGN KEY (PartyNumber) REFERENCES InvolvedParties(PartyNumber))');


        fs.createReadStream('../Crashes.csv')
            .pipe(csv())
            .on('data', async (row) => {
                await connection.execute('INSERT INTO Crashes VALUES (${row[\'CASE_ID\']}, ${row[\'CrashDate\']}, ${row[\'CrashTime\']},\n' +
                    '                            ${row[\'WeatherCondition1\']}, ${row[\'WeatherCondition2\']},\n' +
                    '                            ${row[\'CollisionSeverity\']}, ${row[\'NumberInjured\']},\n' +
                    '                            ${row[\'ViolationCategory\']}, ${row[\'CollisionType\']},\n' +
                    '                            ${row[\'City\']})');
                await connection.execute('INSERT INTO InvolvedParties VALUES (${row[\'CaseID\']}, ${row[\'PartyNumber\']},\n' +
                    '                                    ${row[\'PartyType\']}, ${row[\'AtFault\']},\n' +
                    '                                    ${row[\'VehicleType\']})');
                await connection.execute('INSERT INTO Victims VALUES (${row[\'CaseID\']}, ${row[\'PartyNumber\']},\n' +
                    '                            ${row[\'VictimNumber\']}, ${row[\'VictimRole\']},\n' +
                    '                            ${row[\'Gender\']}, ${row[\'Age\']},\n' +
                    '                            ${row[\'DegreeOfInjury\']}, ${row[\'SafetyEquipment1\']},\n' +
                    '                            ${row[\'SafetyEquipment2\']})');
            })
            .on('end', () => {
                console.log('CSV file successfully processed');
            });
    } catch (err) {
        console.error('Connect Error!', err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Disconnect Error!', err);
            }
        }
    }
}

initDatabase();

//change tableName with whatever the table name is in our database
//same with user, password, and connectString
app.get('/tableName', (req, res) => {
    async function fetchDataTableName() {
        try {
            const connection = await oracle.getConnection({
                user: 'username',
                password: 'password',
                connectString: 'localhost/dbName'
            });
            //just an example of what we can store as a result
            return await connection.execute('SELECT * FROM username.customers');
        } catch (error) {
            return error;
        }
    }

    fetchDataTableName()
        .then(dbRes => {
            res.send(dbRes);
        })
        .catch(err => {
            res.send(err);
        })
}) */

app.listen(process.env.PORT, () => {
    console.log('listening to port', process.env.PORT);
})