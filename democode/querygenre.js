// Simple document query
var DocumentDBClient = require('documentdb').DocumentClient
  , config = require('../config')
  , fs = require('fs')
  , async = require('async')
  , databaseId = config.names.database
  , collectionId = config.names.collection
  , dbLink
  , collLink;

var host = config.connection.endpoint;
var masterKey = config.connection.authKey;

var client = new DocumentDBClient(host, {masterKey: masterKey});

var docLink = "dbs/" + databaseId+ "/colls/"+collectionId;
console.log(docLink);

client.queryDocuments(docLink, 'SELECT m.results[0].title FROM movies m').toArray(function (err, results) {
            if (err) {
                console.log(err);

            } else {
                console.log(results);
            }
        });
