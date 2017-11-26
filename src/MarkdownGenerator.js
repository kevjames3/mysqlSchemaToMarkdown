const fs                = require('fs');

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
  output.push("\n");
  output.push(getMarkdownStub(tableConfig.before));
  output.push("\n");
  output.push(getMarkdownStub(tableConfig.after));
  return output.join("");
}

module.exports = class MarkdownGenerator {
  constructor(globalSettings, tableConfigs){
    this.globalSettings = globalSettings;
    this.tableConfigs = tableConfigs;
    this.output = [];
  }

  generateMarkdown(tables){
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