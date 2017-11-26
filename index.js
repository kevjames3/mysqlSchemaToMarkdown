const MySQLClassWrapper = require('./src/MySQLWrapper.js');
const MarkdownGenerator = require('./src/MarkdownGenerator.js');
const program           = require('commander');
const fs                = require('fs');

let config            = undefined;
let mySqlConnection   = undefined;
let generator         = undefined

program
  .version('1.0.0')
  .description('Translate your database schema into markdown files')
  .option('-c, --config <configFile>', 'Sample config file')
  .parse(process.argv);

if (program.config === undefined) {
    console.error('No config given!  See help for more info');
    process.exit(1);
}

if (fs.existsSync(program.config)){
  config = require(program.config);
} else {
  console.error('The config file does not exist!');
  process.exit(1);
}

mySqlConnection = new MySQLClassWrapper(config.dbConfig);
generator = new MarkdownGenerator(config.globalSettings, config.tables);

//Do the MySQL Work
mySqlConnection.connect();
let promiseArray = Object.keys(config.tables).map(mySqlConnection.getSchemaInformation);
mySqlConnection.closeConnection();

Promise.all(promiseArray).then((values) => {
  generator.generateMarkdown(Object.assign.apply({}, values));
})
