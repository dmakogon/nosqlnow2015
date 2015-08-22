#!/bin/bash

# This product uses the TMDb API but is not endorsed or certified by TMDb.
#
# be sure to set api_key in your environment first

id_start=1
id_end=1000
echo This product uses the TMDb API but is not endorsed or certified by TMDb."

echo "id start: $id_start"
echo "id end: $id_end"
for ((i=${id_start};i<=${id_end};i++))
do
	echo "$i"
   if [ $((i % 10)) -eq 0 ]
   then
      echo $i
   fi

   url="http://api.themoviedb.org/3/movie/now_playing?page=${i}&api_key=${api_key}"
   httpresponse=$(curl -o /dev/null --silent -w "%{http_code}" "$url")
    # ; #> movie${i}.json;
   #echo "$result"
   if [ $httpresponse -eq "200" ]
   then
      result=$(curl --silent --header "Accept: application/json" "http://api.themoviedb.org/3/movie/now_playing?page=${i}&api_key=${api_key}")
   	  echo "$result" > movie${i}.json
   elif [ $httpresponse -eq "429" ]
   then
      echo "THROTTLED!"
   fi 
   sleep .35;
done
