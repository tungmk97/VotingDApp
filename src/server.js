var express = require('express');
var app = express();

const mainContractJSON = require('../build/contracts/MainContract.json')
const electionJSON = require('../build/contracts/Election.json')

require("dotenv").config();

app.use(express.static("./"));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get('/mainContractJSON', (req, res) => {
    res.send(mainContractJSON);
});

app.get('/electionJSON', (req, res) => {
    res.send(electionJSON.abi);
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started at 3000');
});