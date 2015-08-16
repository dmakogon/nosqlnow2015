// Simple document query - look for a given movie
//
// Usage: node querymovie movietitle

var DocumentDBClient = require('documentdb').DocumentClient
  , config = require('../config')
  , fs = require('fs')
  , async = require('async')
  , databaseId = config.names.database
  , collectionId = config.names.collection
  , dbLink
  , collLink;


if (process.argv.length <= 2) {
    console.log("Usage: querymovie <movietitle>");
    process.exit(-1);
}
 
var movietitle = process.argv[2];

var host = config.connection.endpoint;
var masterKey = config.connection.authKey;

var client = new DocumentDBClient(host, {masterKey: masterKey});

var docLink = "dbs/" + databaseId+ "/colls/"+collectionId;

var query = "SELECT * from Movies m WHERE m.title = '" + movietitle + "'";

client.queryDocuments(docLink, query).toArray(function (err, results) {
            if (err) {
                console.log(err);

            } else {
                console.log(results);
            }
        });
