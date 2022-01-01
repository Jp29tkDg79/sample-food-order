#!bin/bash
cd ./docker-entrypoint-initdb.d

mongoimport -u admin -p admin --db store --collection users --file ./users.json --authenticationDatabase admin --jsonArray

mongoimport -u admin -p admin --db store --collection items --file ./items.json --authenticationDatabase admin --jsonArray

mongo -u admin -p admin ./createuser.js
