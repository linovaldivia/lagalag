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
        var curMarker = createAndSetCurrentMarker(latLng, placeName);
        showPlaceSenseWindowWithInfo(latLng, placeName, curMarker);
    } else {
        showPlaceSenseWindow(latLng);
    }
}

function createAndSetCurrentMarker(latLng, placeName) {
    var marker = gMarkerManager.createMarker(latLng, placeName);
    gMarkerManager.setCurrentMarker(marker);
    return marker;
}

function showPlaceSenseWindowWithInfo(latLng, placeName, marker, placeSenseId) {
    // Render the place sense window after the marker has been drawn for a smoother effect (at least in Chrome).
    window.setTimeout(function() {
        gPlaceSenseWindow.open(latLng, placeName, marker, placeSenseId);
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
    var marker = gMarkerManager.getCurrentMarker();
    marker.placeAndSense = placeAndSense;
    addOnClickListenerOnce(marker);
    gMarkerManager.clearCurrentMarker();
}

function addOnClickListenerOnce(marker) {
    if (!marker.hasClickListener) {
        marker.addListener("click", function() { onMarkerClick(marker); });
        marker.hasClickListener = true;
    }
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
    var curMarker = gMarkerManager.getCurrentMarker();
    if (curMarker && !curMarker.placeAndSense) {
        gMarkerManager.removeCurrentMarkerFromMap();
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
    
    gMarkerManager.setCurrentMarker(marker);
    var placeAndSense = marker.placeAndSense;
    setCurrentPlace(placeAndSense.place);
    
    var latLng = new LatLng(placeAndSense.place.lat, placeAndSense.place.lng);
    var placeName = placeAndSense.place.name;
    var placeSenseId = placeAndSense.placeSense;
    showPlaceSenseWindowWithInfo(latLng, placeName, marker, placeSenseId);
}

$(document).ready(function() {
    // Reserved for future ondocumentready function calls
});
