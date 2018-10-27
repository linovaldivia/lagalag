/**
 * lagalag javascript functions.
 */
var gLagamap = null;
var gPlaceSenseWindow = null;
var gPlace = null;
var gCurrentMarker = null;
var gRevGeocodeLookup = new RevGeocodeLookupService();

function initMap() {
    gLagamap = new Lagamap("map");
    gLagamap.createMap();
    gLagamap.addListener("click", onMapClick);
    gLagamap.addListener("zoom_changed", onZoomChanged);
    
    gPlaceSenseWindow = new PlaceSenseWindow(gLagamap, onPlaceSenseWindowSave, onPlaceSenseWindowCancel);
}

function onMapClick(e) {
    closePlaceSenseWindowAndRemoveTempMarker();
    // Attempt to find nearest place to the click point.
    var lat = e.latLng.lat();
    var lng = e.latLng.lng();
    gRevGeocodeLookup.getPlaceAtLocation(lat, lng, onSuccessfulPlaceLookup);
}

function onSuccessfulPlaceLookup(placeInfo) {
    var latLng = new LatLng(placeInfo.lat, placeInfo.lng);
    var placeName = placeInfo.name;
    if (placeInfo.name) {
        setCurrentPlaceFromPlaceInfo(latLng, placeInfo);
        gCurrentMarker = new PlaceSenseMarker(gLagamap, latLng, placeName);
        showPlaceSenseWindowWithInfo(latLng, placeName);
    } else {
        showPlaceSenseWindow(latLng);
    }
}

function showPlaceSenseWindowWithInfo(latLng, placeName, placeSenseId) {
    // Render the place sense window after the marker has been drawn for a smoother effect (at least in Chrome).
    window.setTimeout(function() {
        gPlaceSenseWindow.open(latLng, placeName, gCurrentMarker, placeSenseId);
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
    configureCurrentMarkerOnSave(placeAndSense);
    closePlaceSenseWindow();
}

function configureCurrentMarkerOnSave(placeAndSense) {
    gCurrentMarker.setPlaceAndSense(placeAndSense);
    gCurrentMarker.click(onMarkerClick);
    gCurrentMarker = null;
}

function onPlaceSenseWindowCancel() {
    closePlaceSenseWindowAndRemoveTempMarker();
}

function setCurrentPlaceFromPlaceInfo(latLng, placeInfo) {
    gPlace = new Place(placeInfo, latLng);
}

function setCurrentPlace(place) {
    gPlace = place;
}

function closePlaceSenseWindowAndRemoveTempMarker() {
    closePlaceSenseWindow();
    if (gCurrentMarker && gCurrentMarker.isTemporary()) {
        removeCurrentMarkerFromMap();
    }
}

function closePlaceSenseWindow() {
    gPlaceSenseWindow.close();
}

function onZoomChanged() {
    if (gPlaceSenseWindow.isOpen()) {
        gPlaceSenseWindow.recenterMapOnWindow();
    }
}

function onMarkerClick(marker) {
    closePlaceSenseWindowAndRemoveTempMarker();
    
    gCurrentMarker = marker;
    var placeAndSense = marker.getPlaceAndSense();
    setCurrentPlace(placeAndSense.place);
    
    var latLng = new LatLng(placeAndSense.place.lat, placeAndSense.place.lng);
    var placeName = placeAndSense.place.name;
    var placeSenseId = placeAndSense.placeSense;
    showPlaceSenseWindowWithInfo(latLng, placeName, placeSenseId);
}

function removeCurrentMarkerFromMap() {
    gCurrentMarker.removeFromMap();
    gCurrentMarker = null;
} 

$(document).ready(function() {
    // Reserved for future ondocumentready function calls
});
