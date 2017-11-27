# mysqlSchemaToMarkdown
Translate a DB Schema to Markdown (GHC), with a lot of configurability along the way.  The reason why I chose to make a generator then use the ones that are out in the wild is because I needed the following functionality:

* Make it so this script can be be automated, with a CI hook or git hook if need be
* Make it so that I can remove the columns that I don't think that are important to the documentation (example: `Collation` or `Privileges`)
* Add additional documentation that can be added before/after a table.

## How to Run

To run, call the following:

```bash
node index.js --config <config>
```

### Configuration File

A sample config file is located [here](./sample_config.json).  Field description is as follows

* `dbConfig` [Required]
  * `host` [Required] _String_ - Where the host will connect.  In most cases, `localhost` is the direction you want to go
  * `port` [Optional] _Number_ - Defaults to 3306
  * `user` [Required] _String_ - In the case of localhost, this is typically `root`
  * `database` [Required] _String_ - The database we will be reading table data from
  * `password` [Optional] _String_ - The password to the database
* `outputMarkdown` [Required] _String_ - Where you want the markdown outputted
* `globalSettings` [Optional]
  * `documentName` [Optional] _String_ - What you want the title of the document to be
  * `before` [Optional] _String_ - The file path of a markdown document that you want to be prepended to the document before the tables are listed.  Example [here](sampleStubMarkdown/globalBefore.md).
  * `after` [Optional] _String_ - The file path of a markdown document that you want to be appended to the document after the tables are listed.  Example [here](sampleStubMarkdown/globalAfter.md)
  * `shownColumns` [Optional] _Array_ - If you want only to show some of the columns, list them out here.  Order does not matter in this case.  If the field is not defined, defaults to:
    * ```json
      "shownColumns": [
        "Field",
        "Comment",
        "Type",
        "Collation",
        "Null",
        "Key",
        "Default",
        "Extra",
        "Privileges"
      ]
      ```
  * `tables` [Required] _Object_ - The list of tables that you want outputted.  Format is that the __key__ is the table name, while the properties are for the markdown. Example:
  ```json
    "tables": {
      "house": { 
        "before": "sampleStubMarkdown/houseBefore.md"    
      },
      "pet": {
        "before": "sampleStubMarkdown/petBefore.md",
        "after": "sampleStubMarkdown/petAfter.md"
      }
    }
  ```
    * `before` [Optional] _String_ - The file path of a markdown document that you want to be prepended to the section before this table's data is listed.  Example [here](sampleStubMarkdown/petBefore.md).
    * `after` [Optional] _String_ - The file path of a markdown document that you want to be appended to the section after this table's data is listed.  Example [here](sampleStubMarkdown/petAfter.md)

### Additional Info
```bash
Usage: index [options]

  Translate your database schema into markdown files


  Options:

    -V, --version              output the version number
    -c, --config <configFile>  Sample config file
    -h, --help                 output usage information
```

## Try Me

I wrote up a quick and dirty script to show off the functionality this piece of software.  Disclaimer, you need the following:

* Linux/OSX (or something that can run a bash script)
* A locally running instance of MySQL and that can handle the following settings
* ```json
  "host": "localhost",
  "port": 5984,
  "user": "root",
  "password": null
  ```
  * Note: if you have your local instance under different settings, feel free to update `sample_config.json` to the settings that work for you
* Be ok if the script adds a database `mysqlSchemaToMarkDown_SampleData` to your local instance.  After the demonstration, feel free to drop the tables and/or database.

If you are good with all of that, go to the root directory of this project and run:
```bash
TBD
```