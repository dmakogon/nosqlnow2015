Movie data walkthrough
===

# Range queries

## Direct movie search
### query by movie title
 	SELECT * from Movies m
 	WHERE m.title = "Ant-Man"

### query by vote score
 	SELECT * from Movies m
 	WHERE m.vote_average = 3

### what about a range?
 	SELECT * from Movies m
 	WHERE m.vote_average > 2
 	AND m.vote_average < 3

### convert vote_average to range query

