const dotenv = require('dotenv');
var mysql = require('mysql');
var bodyParser = require('body-parser')
const express = require('express')
const app = express()

var routes = express.Router();

var table = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: "root",
  password: process.env.SQL_PW,
  database: "netview"
});
//get all subnets
routes.get('/',(req,res)=>{
  table.query('SELECT * from subnet',(err, rows, fields)=>{
    if(!err)
    res.send(rows);
    else
    console.log(err);
  })
});

//get one manufacturer
routes.get('/:id',(req,res)=>{
  table.query('SELECT * from subnet WHERE id = ?',[req.params.id],(err, rows, fields)=>{
    if(!err)
    res.send(rows);
    else
    console.log(err);
  })
});

//delete one ip
routes.delete('/:id',(req,res)=>{
  console.log(req.params);
  table.query('DELETE FROM subnet WHERE id = ?',[req.params.id],(err, rows, fields)=>{
    if(!err)
    res.send('Deleted!');
    else
    console.log(err);
  })
});

//add one ip
var jsonParser = bodyParser.json()
routes.post('/', jsonParser,(req,res)=>{
  var post = "INSERT INTO subnet VALUES(null, '"+ req.body.subnet_name +"', '"+ req.body.subnet +"', '"+ req.body.note +"')";
  table.query(post ,(err, rows, fields)=>{
    if(!err)
    res.send(rows);
    else
    console.log(err);
  })
});

//edit one ip
var jsonParser = bodyParser.json()
routes.put('/:id', jsonParser,(req,res)=>{
  var post = "UPDATE subnet SET \
  subnet_name='"+ req.body.subnet_name +"', \
  subnet='"+ req.body.subnet +"', \
  note='"+ req.body.note +"' \
  WHERE ID ='"+req.params.id +"'";
  table.query(post ,(err, rows, fields)=>{
    if(!err)
    res.send('Updated');
    else
    console.log(err);
  })
});
module.exports = routes
