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

//get all manufacturers
routes.get('/',(req,res)=>{
  table.query('SELECT * from manufacturer',(err, rows, fields)=>{
    if(!err)
    res.send(rows);
    else
    console.log(err);
  })
});

//get one manufacturer
routes.get('/:id',(req,res)=>{
  table.query('SELECT * from manufacturer WHERE id = ?',[req.params.id],(err, rows, fields)=>{
    if(!err)
    res.send(rows);
    else
    console.log(err);
  })
});

//delete one ip
routes.delete('/:id',(req,res)=>{
  console.log(req.params);
  table.query('DELETE FROM manufacturer WHERE id = ?',[req.params.id],(err, rows, fields)=>{
    if(!err)
    res.send('Deleted!');
    else
    console.log(err);
  })
});

//add one ip
var jsonParser = bodyParser.json()
routes.post('/', jsonParser,(req,res)=>{
  var post = "INSERT INTO manufacturer VALUES(null, '"+ req.body.manufacturer_name +"', '"+ req.body.note +"')";
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
  var post = "UPDATE manufacturer SET \
  manufacturer_name='"+ req.body.manufacturer_name +"', \
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
