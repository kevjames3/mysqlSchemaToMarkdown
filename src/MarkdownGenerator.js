const fs         = require('fs');
const tableOrder = [
  "Field",
  "Comment",
  "Type",
  "Collation",
  "Null",
  "Key",
  "Default",
  "Extra",
  "Privileges"
];

function getMarkdownStub(stubFilePath){
  let retValue = "";
  if (fs.existsSync(stubFilePath)){
    retValue = fs.readFileSync(stubFilePath);
  } else {
    console.warn(`Could not located file ${stubFilePath}`);
    retValue = "";
  }
  return retValue;
}

function processTableData(columnName, columnValue){
  if (columnName == "Type" && columnValue.match(/\benum\b/i)){
    //Types of enum are typically long, and are too aggressive in taking up the column width in the markdown
    return columnValue.replace(/((enum\()|(',))/g, "$1<br />");
  } else {
    return columnValue;
  }
}

function generateMarkdownIfFieldDefined(field){
  let output = [];
  if(field){
    output.push("\n");
    output.push(getMarkdownStub(field));
  }
  return output.join("");
}

function generateOutputForTable(name, data, tableConfig, columnListing){
  let output = [];
  output.push(`# \`${name}\`\n`);
  output.push(generateMarkdownIfFieldDefined(tableConfig.before));
  output.push("\n\n");

  //Let's do the columns
  data.forEach((row, index) => {
    if(index == 0) { //If it is the first row, let's put the header first
      //Column header section
      output.push("|");
      columnListing.forEach((column) => {
        output.push(` ${column} |`);
      });
      output.push("\n");

      //Row beneath the column header
      output.push("|");
      for(let i = 0; i < columnListing.length; i++){
        output.push(" --- |");
      }
      output.push("\n");
    }

    //Now time for the data
    output.push("|"); 
    columnListing.forEach((column) => {
      output.push(` ${processTableData(column, row[column])} |`);
    });
    output.push("\n");
  })

  output.push(generateMarkdownIfFieldDefined(tableConfig.after));
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
    let outputtedColumns = tableOrder;
    if(this.globalSettings.shownColumns){
      outputtedColumns = tableOrder.filter((val) => {
        return this.globalSettings.shownColumns.indexOf(val) >= 0;
      });
    }
    
    //Generate the header
    this.output.push("<!--- ");
    this.output.push("This output was generated automatically.  Take care when editing.");
    this.output.push("-->");
    this.output.push("\n");
    this.output.push(`# ${this.globalSettings.documentName}\n`);
    this.output.push(generateMarkdownIfFieldDefined(this.globalSettings.before));
    this.output.push("\n");
    Object.keys(tables).forEach((tableName) => {
      this.output.push(generateOutputForTable(
        tableName, tables[tableName], this.tableConfigs[tableName], outputtedColumns
      ));
      this.output.push("\n");
    });
    this.output.push(generateMarkdownIfFieldDefined(this.globalSettings.after));
  }

  saveMarkdown(outputFile){
    fs.writeFileSync(outputFile, this.output.join(""));
  }
}