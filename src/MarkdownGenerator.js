const fs         = require('fs');
const tableOrder = [
  "Field",
  "Type",
  "Collation",
  "Null",
  "Key",
  "Default",
  "Extra",
  "Privileges",
  "Comment"
];

function getMarkdownStub(filePath){
  let retValue = "";
  if (fs.existsSync(filePath)){
    retValue = fs.readFileSync(filePath);
  } else {
    console.warn(`Could not located file ${filePath}`);
    retValue = "";
  }
  return retValue;
}

function generateOutputForTable(name, data, tableConfig){
  let output = [];
  output.push(`# \`${name}\`\n`);
  if(tableConfig.before){
    output.push("\n");
    output.push(getMarkdownStub(tableConfig.before));
  }
  output.push("\n\n");

  //Let's do the columns
  data.forEach((row, index) => {
    if(index == 0) { //If it is the first row, let's put the header first
      //Column header section
      output.push("|");
      tableOrder.forEach((column) => {
        output.push(` ${column} |`);
      });
      output.push("\n");

      //Row beneath the column header
      output.push("|");
      for(let i = 0; i < tableOrder.length; i++){
        output.push(" --- |");
      }
      output.push("\n");
    }

    //Now time for the data
    output.push("|"); 
    tableOrder.forEach((column) => {
      output.push(` ${row[column]} |`);
    });
    output.push("\n");
  })

  if(tableConfig.after){
    output.push("\n");
    output.push(getMarkdownStub(tableConfig.after));
  }
  output.push("\n");
  return output.join("");
}

module.exports = class MarkdownGenerator {
  constructor(globalSettings, tableConfigs){
    this.globalSettings = globalSettings;
    this.tableConfigs = tableConfigs;
    this.output = [];
  }

  generateMarkdown(tables){
    //Generate the header
    this.output.push("<!--- ")
    this.output.push("This output was generated automatically.  Take care when editing.")
    this.output.push("-->")
    this.output.push("\n");
    this.output.push(`# ${this.globalSettings.documentName}\n`);
    this.output.push("\n");
    this.output.push(getMarkdownStub(this.globalSettings.before));
    this.output.push("\n");
    Object.keys(tables).forEach((tableName) => {
      this.output.push(generateOutputForTable(tableName, tables[tableName], this.tableConfigs[tableName]));
      this.output.push("\n");
    });
    this.output.push(getMarkdownStub(this.globalSettings.after));
  }

  saveMarkdown(outputFile){
    fs.writeFileSync(outputFile, this.output.join(""));
  }
}