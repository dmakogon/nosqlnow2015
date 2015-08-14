Movie data walkthrough
===

## hash queries
 * We'll search for a specific movie title or other attribute

### query by movie title
	SELECT * from Movies m
	WHERE m.title = "Ant-Man"

### query by vote score
 	SELECT * from Movies m
 	WHERE m.vote_average = 3

 	SELECT * from Movies m
 	WHERE m.vote_average = 3
### query on subdocuments: Find document with genre array containing Comedy

* Indexes are automatically created for every single property
* Usable as soon as content is saved

        select m.title
        from movies m
        join g in m.genres where g.name="Comedy"

## Range queries


### what about a range? (show query cost)
 	SELECT * from Movies m
 	WHERE m.vote_average > 2
 	AND m.vote_average < 3

### convert vote_average to range query
 * collection is still accessible during conversion - async background operation

### re-run query (show query cost)

## Precision and space-vs-perf
*TBD
