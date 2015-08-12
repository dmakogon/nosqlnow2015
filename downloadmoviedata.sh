#!/bin/bash

# be sure to set api_key in your environment first

for ((i=0;i<=5;i++))
do
   if [ $((i % 10)) -eq 0 ]
   then
      echo $i
   fi
   curl --silent --header "Accept: application/json" "http://api.themoviedb.org/3/movie/${i}?api_key=${api_key}";
   sleep .18;
done