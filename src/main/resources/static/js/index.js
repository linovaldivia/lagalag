/**
 * Home page javascript functions.
 */

function updatePlaceStats(placeStats) {
    $("#numPlaces").html(placeStats.numPlaces);
    $("#numCountries").html(placeStats.numCountries);
}

$(document).ready(function() {
    // Reserved for future ondocumentready function calls
});
