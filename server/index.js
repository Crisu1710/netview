const dotenv = require('dotenv');
var mysql = require('mysql');
var bodyParser = require('body-parser')
const express = require('express')
const app = express()

dotenv.config();

var con = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: "root",
  password: process.env.SQL_PW
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE IF NOT EXISTS netview", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});

var table = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: "root",
  password: process.env.SQL_PW,
  database: "netview"
});

//CREATE TABLE IF NOT EXISTS
table.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var favorit = "CREATE TABLE IF NOT EXISTS \
  favorites(id INT PRIMARY KEY AUTO_INCREMENT, \
    name VARCHAR(255) NOT NULL, \
    icon_url VARCHAR(1000), \
    https VARCHAR(5), \
    hostname VARCHAR(100) NOT NULL, \
    port INT, \
    path VARCHAR(100), \
    note VARCHAR(300), \
    color VARCHAR(80) \
  )";
  var manufacturer = "CREATE TABLE IF NOT EXISTS \
  manufacturer(id INT PRIMARY KEY AUTO_INCREMENT, \
    manufacturer_name VARCHAR(30), \
    note VARCHAR(100) \
  )";
  var device = "CREATE TABLE IF NOT EXISTS \
  device(id INT PRIMARY KEY AUTO_INCREMENT, \
    type VARCHAR(30), \
    amount INT, \
    note VARCHAR(100) \
  )";
  var subnet = "CREATE TABLE IF NOT EXISTS \
  subnet(id INT PRIMARY KEY AUTO_INCREMENT, \
    subnet_name VARCHAR(30), \
    subnet VARCHAR(24), \
    note VARCHAR(150) \
  )";
  var ips = "CREATE TABLE IF NOT EXISTS \
  ips(id INT PRIMARY KEY AUTO_INCREMENT, \
    ip VARCHAR(20) NOT NULL, \
    hostname VARCHAR(30), \
    subnet_id INT, \
    ports VARCHAR(100) NOT NULL, \
    manufacturer_id INT, \
    device_id INT, \
    note VARCHAR(150), \
    uiport INT, \
    FOREIGN KEY (subnet_id) REFERENCES subnet (id), \
    FOREIGN KEY (manufacturer_id) REFERENCES manufacturer (id), \
    FOREIGN KEY (device_id) REFERENCES device (id) \
  )";
  table.query(favorit, function (err, result) {
    if (err) throw err;
    console.log("Table favorits created");
  });
  table.query(manufacturer, function (err, result) {
    if (err) throw err;
    console.log("Table manufacturers created");
  });
  table.query(device, function (err, result) {
    if (err) throw err;
    console.log("Table devices created");
  });
  table.query(subnet, function (err, result) {
    if (err) throw err;
    console.log("Table subnets created");
  });
  table.query(ips, function (err, result) {
    if (err) throw err;
    console.log("Table ips created");
  });
});

// Add headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Credentials', true); // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
  next();
});

app.use(express.json());

const favorites = require('./routes/api/favorites');
const ips = require('./routes/api/ips');
const manufacturers = require('./routes/api/manufacturers');
const devices = require('./routes/api/devices');
const subnets = require('./routes/api/subnets');

app.use('/api/favorites', favorites);
app.use('/api/ips', ips);
app.use('/api/manufacturers', manufacturers);
app.use('/api/devices', devices);
app.use('/api/subnets', subnets);


app.listen(3000,()=>console.log('Api server is running on port 3000'));
