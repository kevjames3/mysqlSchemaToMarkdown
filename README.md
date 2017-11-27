# mysqlSchemaToMarkdown
Translate a DB Schema to Markdown (GHC), with a lot of configurability along the way.  The reason why I chose to make a generator then use the ones that are out in the wild is because I needed the following functionality:

* Make it so this script can be be automated, with a CI hook or git hook if need be
* Make it so that I can remove the columns that I don't think that are important to the documentation (example: `Collation` or `Privileges`)
* Add additional documentation that can be added before/after a table.

## How to Run

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