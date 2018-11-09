/**
 * Home page javascript functions.
 */

function updatePlaceStats(placeStats) {
    $("#numVisitedPlaces").html(placeStats.numVisitedPlaces);
    $("#numVisitedCountries").html(placeStats.numVisitedCountries);
    $("#numWannaGoPlaces").html(placeStats.numWannaGoPlaces);
    $("#numLovedPlaces").html(placeStats.numLovedPlaces);
}

$(document).ready(function() {
    // Reserved for future ondocumentready function calls
});
