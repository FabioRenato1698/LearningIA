var mysql = require('mysql');

// DBPASS must be defined with the database password
// Powershell: $env:DBPASS="password"
// CMD (windows): set DBPASS="password"
// Linux and iOS: export DBPASS="password"
// Heroku: Go to Settings and then to config vars

var pool  = mysql.createPool({
    connectionLimit : 10,
    host     : 'remotemysql.com',
    user     : 'aV6bHFsllD',
    password :  'qOIGqHdGfT',
    database : 'aV6bHFsllD'
});

module.exports.pool = pool;