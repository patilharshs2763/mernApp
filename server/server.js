const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const connection = require('./connection');

const app = express();
const port = 3001;
app.use(bodyParser.json());
// app.use(cors({
//     origin: '*'
// }))
app.use(cors());
app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.post('/register', async (req, res) => {
    try {
        const data = req.body;
        const querySql = `INSERT INTO studentTest (name,mobile) VALUES ('${data.name}','${data.mobile}')`;

        const rows = await connection({ querys: querySql, values: [] });
        res.status(201).send({ message: "Registered successfully", data: rows });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send({ error: "Internal Server Error", details: error.message });
    }
})


app.get('/getusers', async (req, res) => {
    try {
        const querySql = `SELECT * FROM studentTest`;
        // const [rows] = await connection.query(querySql);
        const rows = await connection({ querys: querySql, values: [] });
        console.log(rows);
        res.status(200).send(rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({ error: "Internal Server Error", details: error.message });
    }
})

app.delete('/getuser/:id', async (req, res) => {
    const { id } = req.params;
    const querySql = `DELETE FROM studentTest WHERE ID='${id}'`;
    const rows = await connection({ querys: querySql, values: [] });
    res.status(200).send(rows);
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})