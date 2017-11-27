#!/usr/bin/env bash

ECHO "Running the SQL Command to create the database";
mysql -u root < ./sample/createSampleSchema.sql;

rc=$?; 
if [[ $rc != 0 ]]; then 
ECHO "Something went wrong with SQL, so we need to exit.  Try running the command yourself to see what went wrong";
exit $rc; 
fi

ECHO "Generating the Markdown now...";
node index.js --config './sample/sample_config.json';

exit 0;