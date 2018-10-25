/**
 * lagalag javascript functions.
 */
var gLagamap = null;
var gPlaceSenseWindow = null;
var gPlace = null;
var gMarkerManager = null;
var gRevGeocodeLookup = new RevGeocodeLookupService();

function initMap() {
    gLagamap = new Lagamap("map");
    gLagamap.createMap();
    
    gPlaceSenseWindow = new PlaceSenseWindow(gLagamap, onPlaceSenseWindowSave, onPlaceSenseWindowCancel);
    gMarkerManager = new PlaceSenseMarkerManager(gLagamap);
    
    gLagamap.addListener("click", onMapClick);
    gLagamap.addListener("zoom_changed", onZoomChanged);
}

function onMapClick(e) {
    closePlaceSenseWindowAndRemoveMarker();
    // Attempt to find nearest place to the click point.
    var lat = e.latLng.lat();
    var lng = e.latLng.lng();
    gRevGeocodeLookup.getPlaceAtLocation(lat, lng, onSuccessfulPlaceLookup);
}

function onSuccessfulPlaceLookup(placeInfo) {
    var latLng = {lat: placeInfo.lat, lng: placeInfo.lng};
    if (placeInfo.name) {
        storeCurrentPlace(latLng, placeInfo);
        createAndSetCurrentMarker(latLng, placeInfo.name);
        showPlaceSenseWindowWithInfo(latLng, placeInfo);
    } else {
        showPlaceSenseWindow(latLng);
    }
}

function createAndSetCurrentMarker(latLng, placeName) {
    var marker = gMarkerManager.createMarker(latLng, placeName);
    gMarkerManager.setCurrentMarker(marker);
}

function showPlaceSenseWindowWithInfo(latLng, placeInfo) {
    var placeName = placeInfo.name;
    var curMarker = gMarkerManager.getCurrentMarker();
    // Render the place sense window after the marker has been drawn for a smoother effect (at least in Chrome).
    window.setTimeout(function() {
        gPlaceSenseWindow.open(latLng, placeName, curMarker);
    }, 100);
}

function showPlaceSenseWindow(latLng) {
    gPlaceSenseWindow.open(latLng);
}

function onPlaceSenseWindowSave(selectedPlaceSense) {
    var placeAndSense = new PlaceAndSense(gPlace, selectedPlaceSense);
    console.log("Saving placeAndSense: " + JSON.stringify(placeAndSense));
    postJSON("/place-sense", placeAndSense).fail(function() {
        console.error("Unable to save place sense for current place: " + placeAndSense.placeName)
    });
    closePlaceSenseWindow();
    gMarkerManager.clearCurrentMarker();
}

function onPlaceSenseWindowCancel() {
    closePlaceSenseWindowAndRemoveMarker();
}

function storeCurrentPlace(latLng, placeInfo) {
    gPlace = new Place(placeInfo, latLng);
}

function closePlaceSenseWindowAndRemoveMarker() {
    closePlaceSenseWindow();
    gMarkerManager.removeCurrentMarkerFromMap();
}

function closePlaceSenseWindow() {
    gPlaceSenseWindow.close();
}

function onZoomChanged() {
    if (gPlaceSenseWindow.isOpen()) {
        gPlaceSenseWindow.recenterMapOnWindow();
    }
}

$(document).ready(function() {
    // Reserved for future ondocumentready function calls
});
