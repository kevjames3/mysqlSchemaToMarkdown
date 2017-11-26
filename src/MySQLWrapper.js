'use strict';
const mysql       = require('mysql');
const connection  = undefined;
const isConnectionOpen = false;

module.exports = class MySQLWrapper {
  constructor(dbConfig){
    this.dbConfig = dbConfig;

    connection = mysql.createConnection({
      host     : dbConfig.host,
      user     : dbConfig.user,
      database : dbConfig.database,
      password : dbConfig.password
    });
  }

  connect(){
    if(!isConnectionOpen){
      connection.connect();
      isConnectionOpen = true;
    }
  }

  closeConnection(){
    connection.end();
  }

  getSchemaInformation(tableName){
    return new Promise((resolve, reject) => {
      connection.query(`SHOW FULL FIELDS FROM ${tableName}`, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          let retObj = {};
          retObj[tableName] = results;
          resolve(retObj);
        }
      });  
    })
  }
}