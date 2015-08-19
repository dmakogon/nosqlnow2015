// Simple document query for a given genre

var DocumentDBClient = require('documentdb').DocumentClient
  , config = require('../config')
  , databaseId = config.names.database
  , collectionId = config.names.collection
  , host = config.connection.endpoint
  , masterKey = config.connection.authKey


if (process.argv.length <= 2) {
    console.log("Usage: querygenre <genre>");
    process.exit(-1);
}
var movieGenre = process.argv[2];

var client = new DocumentDBClient(host, {masterKey: masterKey});

// Remember the resource model?
// Path to collection: dbs/databasename/colls/collectionname
var collLink = 'dbs/' + databaseId+ '/colls/'+ collectionId;

console.log('\nQuerying against collection path: '  + collLink + '\n');

var querySpec = {
    query: 'SELECT m.title from Movies m \
     JOIN g in m.genres WHERE g.name = @genre',
    parameters: [
        {
            name: '@genre',
            value: movieGenre
        }
    ]
};

var queryIterator = client.queryDocuments(collLink, querySpec, { maxItemCount: 2} );
queryIterator.executeNext(function (err, results, headers) {
  if (err) {
    console.log(err);

  } else if (results.length == 0) {
    console.log('no results found');

  } else {
    console.log(results);
    var charge = headers['x-ms-request-charge'];
    var doc = results[0];
      
    console.log('Request charge: ' + charge);
  }
});