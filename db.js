const Pool = require("pg").Pool; //taking library

//configuring & connecting db & serv
const pool = new Pool({
    user: "postgres",
    password: "1507",
    host: "localhost",
    port: 5432, //default postgres port
    database: "pern"
  });
  
  module.exports = pool;