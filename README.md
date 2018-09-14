# lagalag: the web app (Spring Boot, Bootstrap, Google Maps)

This project demonstrates the use of several popular web technologies to create a functional web application.
The idea is to create a web page where users can mark the places they have visited on a world map, providing info on when they visited and for how long. From there stats and interesting info can be generated (e.g. how many countries have I visited, where did I go in 2015, when did I travel to Siem Reap, etc). Think TripAdvisor's "Cities I've Visited" app but with more cool stuff!
  
More info to follow!

## Setting up

Before running the app, make sure to rename `application.properties.FILLME` to just `application.properties` and set the properties specific to the deployment (e.g. the [Google Maps Javascript API key](https://developers.google.com/maps/documentation/javascript/get-api-key))

After that, it's the typical maven song-and-dance:

    $ mvn install
    ...
    $ java -jar target/web-0.0.1-SNAPSHOT.jar

and then pointing your browser to `<server-host>:8080`.

Screenshot (as of Sep 14 2018):

![screenshot](/screenshots/mainscreen.png)

