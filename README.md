# lagalag: the web app (Spring Boot, Bootstrap, Google Maps)

![screenshot](/screenshots/mainscreen.png)

_Screenshot (as of Sep 19 2018): when a user clicks on the map, a marker and a popup showing the name of the closest city/town appears. Users can give their opinion about the place._

This project demonstrates the use of several popular web technologies to create a functional web application.

The idea is to create a web page where users can mark the places they have visited on a world map, providing info on when they visited and for how long. From there stats and interesting info can be generated, e.g.

* How many countries have I visited?
* Where did I go in 2015?
* When did I travel to Siem Reap? 

Think TripAdvisor's "Cities I've Visited" app but with more cool stuff!
  
More info to follow!

## Setting up

Before running the app, make sure to rename `application.properties.FILLME` to just `application.properties` and set the properties specific to the deployment (e.g. the [Google Maps Javascript API key](https://developers.google.com/maps/documentation/javascript/get-api-key))

After that, it's the typical maven song-and-dance:

    $ mvn install
    ...
    $ java -jar target/lagalag-0.0.1.jar

and then pointing your browser to `<server-host>:8080`.


