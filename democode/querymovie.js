// Simple document query for a given movie

var DocumentDBClient = require('documentdb').DocumentClient
  , config = require('../config')
  , databaseId = config.names.database
  , collectionId = config.names.collection
  , host = config.connection.endpoint
  , masterKey = config.connection.authKey


if (process.argv.length <= 2) {
    console.log("Usage: querymovie <movietitle>");
    process.exit(-1);
}
var movieTitle = process.argv[2];

var client = new DocumentDBClient(host, {masterKey: masterKey});

// Remember the resource model?
// Path to collection: dbs/databasename/colls/collectionname
var collLink = 'dbs/' + databaseId+ '/colls/'+ collectionId;

console.log('\nQuerying against collection path: '  + collLink + '\n');

var querySpec = {
    query: 'SELECT m.title, m.overview, m.id from Movies m WHERE m.title =  @title',
    parameters: [
        {
            name: '@title',
            value: movieTitle
        }
    ]
};

var queryIterator = client.queryDocuments(collLink, querySpec );
queryIterator.executeNext(function (err, results, headers) {
  if (err) {
    console.log(err);

  } else if (results.length == 0) {
    console.log('no results found');

  } else {
    console.log(results);
    var charge = headers['x-ms-request-charge'];
    var doc = results[0];
      
    console.log('Document \'' + doc.id + '\' found, request charge: ' + charge);
  }
});