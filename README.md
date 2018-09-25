# lagalag: the web app (Spring Boot, Bootstrap, Google Maps)

![screenshot](/screenshots/mainscreen.png)

_Screenshot (as of Sep 25 2018): when a user clicks on the map, a marker and a popup showing the name of the closest city/town appears. Users can then give their opinion (or Sense) about a place._

This project demonstrates the use of several popular web technologies to create a functional web application.

Users can mark the places they have visited on a world map, and give their feedback or their _sense_ of a place. They can also provid additional info on when they visited and for how long. From there stats and interesting info can be generated, such as:

* How many countries have I visited?
* Where did I go in 2015?
* When did I travel to Siem Reap? 
* How many places do I have on my list of Places to Visit?

Think TripAdvisor's "Cities I've Visited" app but with more cool stuff!
  
## Setting up

Before running the app, make sure to rename `application.properties.FILLME` to just `application.properties` and set the properties specific to the deployment (e.g. the [Google Maps Javascript API key](https://developers.google.com/maps/documentation/javascript/get-api-key))

After that, you can either run the application directly using maven:

    $ mvn spring-boot:run

or from the jar file once it's created:

    $ java -jar target/lagalag-0.0.1.jar

and then pointing your browser to `<server-host>:8080`.
