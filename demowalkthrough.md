Movie data walkthrough
===

## hash queries
We'll search for a specific movie title or other attribute

### query by movie title
	SELECT * from Movies m
	WHERE m.title = "Ant-Man"

### Also run via code:

	node querymovie <moviename>
	
### query by vote score
 	SELECT * from Movies m
 	WHERE m.vote_average = 3

### query on subdocuments: Find document with genre array containing Comedy

* Indexes are automatically created for every single property
* Usable as soon as content is saved

        select m.title
        from movies m
        join g in m.genres where g.name="Comedy"

## Range queries
### what about a range? (look at query cost)
 	SELECT * from Movies m
 	WHERE m.title BETWEEN "A" AND "B"
* With hash-based indexes, range queries aren't allowed unless you allow for it.
* And even if you allow for it, it is costly, because you will end up scanning all content in the property.

### convert strings to have range indexes
 * collection is still accessible during conversion - async background operation

Run `node addrangeindexes`

### re-run query (show query cost)

## Exclude paths
* Running `excludepath.js <pathname>` will remove a specific json path from indexing.

### Try with overview field:
	node excludepath '/overview/*'

### query for a given overview:

        SELECT * 
	FROM Movies m 
	WHERE m.overview = 'Documentary'

### Afterward, run `resetindex.js`

## Geospatial data

### First run `addgeospatialindex.js` to create spatial indexes on Point data

### Now search for movie theaters within 5 miles of San Jose Convention Center

	SELECT * FROM cinemas c WHERE ST_DISTANCE(c.location, { 
	  "type": "Point", 
	  "coordinates": [-121.889125, 37.33034] 
	}) < 5 * 1600

### Now show theaters within a polygon area:

	SELECT * FROM cinemas c WHERE ST_WITHIN(c.location, 
	{ 
	    "type": "Polygon",  
	    "coordinates": [[	
		[-124.63, 48.36], [-123.87, 46.14], 	
		[-122.23, 45.54], [-119.17, 45.95],	
		[-116.92, 45.96], [-116.99, 49.00], 	
		[-123.05, 49.02], [-123.15, 48.31],	
		[-124.63, 48.36]
	]]})
