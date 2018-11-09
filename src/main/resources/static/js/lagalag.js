/**
 * lagalag javascript functions.
 * TODO rename js, css to match html file name
 */
var gLagamap = null;
var gPlaceSenseWindow = null;
var gPlaceSense = null;
var gCurrentMarker = null;
var gRevGeocodeLookup = new RevGeocodeLookupService();

function initMap() {
    gLagamap = new Lagamap("map");
    gLagamap.createMap();
    gLagamap.onClick(onMapClick);
    gLagamap.onZoomChanged(onZoomChanged);
    
    gPlaceSenseWindow = new PlaceSenseWindow(gLagamap, onPlaceSenseWindowSave, onPlaceSenseWindowCancel);
}

function onMapClick(latLng) {
    closePlaceSenseWindowAndRemoveTempMarker();
    gRevGeocodeLookup.getPlaceAtLocation(latLng.lat, latLng.lng, onSuccessfulPlaceLookup);
}

function onSuccessfulPlaceLookup(placeInfo) {
    var latLng = new LagalatLng(placeInfo.lat, placeInfo.lng);
    var placeName = placeInfo.name;
    if (placeName) {
        gPlaceSense = new PlaceSense(placeInfo, latLng);
        gCurrentMarker = new PlaceSenseMarker(gLagamap, latLng, placeName);
        openPlaceSenseWindowWithInfo();
    } else {
        openEmptyPlaceSenseWindow(latLng);
    }
}

function openPlaceSenseWindowWithInfo() {
    // Render the place sense window after the marker has been drawn for a smoother effect (at least in Chrome).
    window.setTimeout(function() {
        var latLng = gPlaceSense.placeLatLng;
        var placeName = gPlaceSense.placeName;
        var selectedSense = gPlaceSense.sense;
        gPlaceSenseWindow.open(latLng, placeName, gCurrentMarker, selectedSense);
    }, 100);
}

function openEmptyPlaceSenseWindow(latLng) {
    gPlaceSenseWindow.open(latLng);
}

function onPlaceSenseWindowSave(selectedSense) {
    gPlaceSense.sense = selectedSense;
    console.log("Saving PlaceSense: " + JSON.stringify(gPlaceSense));
    postJSON("/place-sense", gPlaceSense).done(function(respData) {
        console.log("Received response: " + JSON.stringify(respData));
        window.parent.updatePlaceStats(respData.stats);
    }).fail(function() {
        console.error("Unable to save PlaceSense for current place: " + gPlaceSense.placeName)
    });
    configureCurrentMarkerOnSave();
    closePlaceSenseWindow();
}

function configureCurrentMarkerOnSave() {
    gCurrentMarker.setPlaceSense(gPlaceSense);
    gCurrentMarker.onClick(onMarkerClick);
    gCurrentMarker = null;
}

function onPlaceSenseWindowCancel() {
    closePlaceSenseWindowAndRemoveTempMarker();
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
    gPlaceSense = marker.getPlaceSense();
    openPlaceSenseWindowWithInfo();
}

function removeCurrentMarkerFromMap() {
    gCurrentMarker.removeFromMap();
    gCurrentMarker = null;
} 

$(document).ready(function() {
    // Reserved for future ondocumentready function calls
});
