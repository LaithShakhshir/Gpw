import mysql from "mysql2"


export const db = mysql.createConnection({
    host: 'localhost',
    database:'database_wink',
    user : 'root',
    password : ''
})


// const sql = require('mysql');
// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const http = require('http');
// const server = http.createServer(app);

// app.use(bodyParser.json({type:'application/json'}));
// app.use(bodyParser.urlencoded({extended:true}));


