require('dotenv').config();

const express = require('express');
const oracle = require('oracledb');
const cors = require('cors');

const app = express();

app.use(cors())

app.get('/', (req,res) => {
    res.send('Hello World')
})

//change tableName with whatever the table name is in our database
//same with user, password, and connectString
app.get('/tableName', (req,res) => {
    async function fetchDataTableName() {
        try {
            const connection = await oracle.getConnection({
                user: 'username',
                password: 'password',
                connectString: 'localhost/dbName'
            });
            //just an example of what we can store as a result
            const result = await connection.execute('SELECT * FROM username.customers');
            return result;
        } catch(error) {
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
})

app.listen(process.env.PORT, () => {
    console.log('listening to port', process.env.PORT);
})