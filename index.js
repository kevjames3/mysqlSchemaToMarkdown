let mysql       = require('mysql');
let program     = require('commander');
let fs          = require('fs');
let process     = require('process');
let config      = undefined;

program
  .version('1.0.0')
  .description('Translate your database schema into markdown files')
  .option('-c, --config <configFile>', 'Sample config file')
  .parse(process.argv);

if (program.config === undefined) {
    console.error('No config given!  See help for more info');
    process.exit(1);
}

//Get the config
if(fs.existsSync(program.config)){
  config = require(program.config);
}

let connection = mysql.createConnection({
  host     : config.dbConfig.host,
  user     : config.dbConfig.user,
  database : config.dbConfig.database,
  password : config.dbConfig.password
});
 
connection.connect();

Object.keys(config.tables).forEach((value) => {
  connection.query('SHOW FULL FIELDS FROM house;', function (error, results, fields) {
    if (error) throw error;
    // connected!
  });  
})

connection.end();