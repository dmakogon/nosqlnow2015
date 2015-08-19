Movie data walkthrough
===

## Hash and Range queries using default indexing

We'll search for a specific movie title. By default, string properties are indexed via hash.

Here's a query by movie title
	SELECT * from Movies m
	WHERE m.title = "Ant-Man"

Also run via code:

	node querymovie <moviename>
	
Try it. For example: `node querymovie "Ant-Man"`

Here's an example of a range-based query on a numeric property, `vote_average`:

 	SELECT m.title, m.vote_average from Movies m
 	WHERE m.vote_average >= 8
 	ORDER by m.vote_average DESC

Even sub-document content is queried by default. Here, we query on subdocuments. Each movie contains an array of genres, and we'll find comedies.

        select m.title
        from movies m
        join g in m.genres where g.name="Comedy"

You can also run via code (try Comedy, Drama, Documentary...):

	node querygenre <genre>
	
## The need to modify default indexing

What about a range on strings? Here, we want primarily titles starting with 'A':

 	SELECT * from Movies m
 	WHERE m.title BETWEEN "A" AND "B"
 
This should have failed. Why? The `BETWEEN` clause attempts to search for a string range.

* With hash-based indexes, range queries aren't allowed unless you allow for it.
* And even if you allow for it, it is costly, because you will end up scanning all content in the property.

We an convert strings to have range indexes. The collection is still accessible during conversion.

Run `node addrangeindexes`

Re-run the query, and it should now work.

Reset indexes:

Run `node resetindex`

## Exclude paths

Here, we'll query for a given overview. Not a realistic query, as nobody would know an entire overview. But here's one small example, with a very small overview:

	SELECT * 
	FROM Movies m 
	WHERE m.overview = 'Documentary'

Imagine the query cost, searching for something *within* an overview. This is something better for a full-text-search engine, but... Here's a query which finds Matrix movies:

	SELECT m.title, m.id 
	FROM Movies m 
	WHERE CONTAINS(m.overview, "Morpheus")

Realistically, we would never query overviews (we'd use our full text search engine). So... let's get rid of it in our indexing:

* Running `excludepath.js <pathname>` will remove a specific json path from indexing.

Try with overview field:

	node excludepath '/overview/*'

Now, the queries against the overview field will fail. Go ahead, try it:

	SELECT m.title, m.id 
	FROM Movies m 
	WHERE CONTAINS(m.overview, "Morpheus")
	
You should have gotten an error, because the path `/overview/*` has been removed from indexing. But... we can *still* get to our Matrix movie based on its id:

	SELECT m.title, m.id 
	FROM Movies m 
	WHERE m.id = "movie603"

Afterward, run `resetindex.js` to go back to defaults.

## Geospatial data

### First run `addgeospatialindex.js` to create spatial indexes on Point data

This adds the `Spatial` index type for data of type `Point`.

Now we can search for theaters roughly within the San Jose area (based on a simple polyglon drawn at the [Simple GeoJSON Editor](https://google-developers.appspot.com/maps/documentation/utils/geojson/).

	SELECT c.name, c.location FROM cinemas c
	 WHERE ST_WITHIN(c.location, 
	{ 
	    "type": "Polygon",  
	    "coordinates": [[ 
	    [-121.88452363014221,37.413800350662875],
	    [-121.97035431861877,37.39089085641704],
	    [-121.95936799049377,37.29317426435305],
	    [-121.80624604225159,37.27186719156333],
	    [-121.78633332252502,37.34286730373346],
	    [-121.88452363014221,37.413800350662875]
	]]})

We can also search for theaters within some distance of a Point. In this case, we can query theaters within 3 miles of the San Jose Convention Center:

	SELECT * FROM cinemas c WHERE ST_DISTANCE(c.location, { 
	  "type": "Point", 
	  "coordinates": [-121.889125, 37.33034] 
	}) < 3 * 1600
	
Afterward, run `resetindex.js` to go back to defaults.
