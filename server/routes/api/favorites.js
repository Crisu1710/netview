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

//get all favorites
routes.get('/',(req,res)=>{
  table.query('SELECT * from favorites',(err, rows, fields)=>{
    if(!err)
    res.send(rows);
    else
    console.log(err);
  })
});

//get one favorite
routes.get('/:id',(req,res)=>{
  table.query('SELECT * FROM favorites WHERE id = ?',[req.params.id],(err, rows, fields)=>{
    if(!err)
    res.send(rows);
    else
    console.log(err);
  })
});

//delete one favorite
routes.delete('/:id',(req,res)=>{
  table.query('DELETE FROM favorites WHERE id = ?',[req.params.id],(err, rows, fields)=>{
    if(!err)
    res.send('Deleted!');
    else
    console.log(err);
  })
});

//add one favorite
var jsonParser = bodyParser.json()
routes.post('/', jsonParser,(req,res)=>{
  var post = "INSERT INTO favorites VALUES(null, '"+ req.body.name +"', '"+ req.body.icon_url +"', '"+ req.body.https +"', '"+ req.body.hostname +"', '"+ req.body.port +"', '"+ req.body.path +"', '"+ req.body.note +"', '"+ req.body.color +"')";
  table.query(post ,(err, rows, fields)=>{
    if(!err)
    res.send(rows);
    else
    console.log(err);
  })
});

//edit one favorite
var jsonParser = bodyParser.json()
routes.put('/:id', jsonParser,(req,res)=>{
  var post = "UPDATE favorites SET \
  name='"+ req.body.name +"', \
  icon_url='"+ req.body.icon_url +"', \
  https='"+ req.body.https +"', \
  hostname='"+ req.body.hostname +"', \
  port='"+ req.body.port +"', \
  path='"+ req.body.path +"', \
  note='"+ req.body.note +"', \
  color='"+ req.body.color +"' \
  WHERE ID ='"+req.params.id +"'";
  table.query(post ,(err, rows, fields)=>{
    if(!err)
    res.send('Updated');
    else
    console.log(err);
  })
});
module.exports = routes
