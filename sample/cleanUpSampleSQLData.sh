#!/usr/bin/env bash

ECHO "Running the SQL Command to cleanup the database with the sample data we added";
mysql -u root < ./sample/removeSampleSchema.sql;

rc=$?; 
if [[ $rc != 0 ]]; then 
ECHO "Something went wrong with SQL, so we need to exit.  Try running the command yourself to see what went wrong";
exit $rc; 
fi