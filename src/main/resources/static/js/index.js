/**
 * Home page javascript functions.
 */

function updatePlaceStats(placeStats) {
    $("#numVisitedPlaces").html(placeStats.numVisitedPlaces);
    $("#numVisitedCountries").html(placeStats.numVisitedCountries);
}

$(document).ready(function() {
    // Reserved for future ondocumentready function calls
});
