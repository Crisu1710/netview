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

routes.get('/',(req,res)=>{
  table.query('select ips.*, device.type, subnet.subnet, manufacturer.manufacturer_name from \
  	ips, device, subnet, manufacturer \
  	where ips.device_id = device.id \
    and ips.subnet_id = subnet.id \
    and ips.manufacturer_id = manufacturer.id;',(err, rows, fields)=>{
    if(!err)
    res.send(rows);
    else
    console.log(err);
  })
});

//get one ips
routes.get('/:id',(req,res)=>{
  table.query('SELECT * from ips WHERE id = ?',[req.params.id],(err, rows, fields)=>{
    if(!err)
    res.send(rows);
    else
    console.log(err);
  })
});

//delete one ip
routes.delete('/:id',(req,res)=>{
  console.log(req.params);
  table.query('DELETE FROM ips WHERE id = ?',[req.params.id],(err, rows, fields)=>{
    if(!err)
    res.send('Deleted!');
    else
    console.log(err);
  })
});

//add one ip
var jsonParser = bodyParser.json()
routes.post('/', jsonParser,(req,res)=>{
  var post = "INSERT INTO ips VALUES(null, '"+ req.body.ip +"', '"+ req.body.hostname +"', '"+ req.body.subnet_id +"', '"+ req.body.ports +"', '"+ req.body.manufacturer_id +"', '"+ req.body.device_id +"', '"+ req.body.note +"', '"+ req.body.uiport +"')";
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
  var post = "UPDATE ips SET \
  ip='"+ req.body.ip +"', \
  hostname='"+ req.body.hostname +"', \
  subnet_id='"+ req.body.subnet_id +"', \
  ports='"+ req.body.ports +"', \
  manufacturer_id='"+ req.body.manufacturer_id +"', \
  device_id='"+ req.body.device_id +"', \
  note='"+ req.body.note +"', \
  uiport='"+ req.body.uiport +"' \
  WHERE ID ='"+req.params.id +"'";
  table.query(post ,(err, rows, fields)=>{
    if(!err)
    res.send('Updated');
    else
    console.log(err);
  })
});
module.exports = routes
