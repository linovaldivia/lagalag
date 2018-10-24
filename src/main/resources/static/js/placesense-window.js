/**
 * Functions related to the display and handling of the "place sense" window.
 * Requires jquery, revgeocode, lagamap, placesense-marker to be loaded first in the containing document.
 */
var gPlaceSenseWindow = null;
var gPlace = null;
var gRevGeocodeLookup = new RevGeocodeLookupService();

const PS_YES_LOVED_IT_ID = "yes-love";
const PS_YES_MEH_ID      = "yes-meh";
const PS_YES_HATED_IT_ID = "yes-hate";
const PS_NO_WANNA_GO     = "no-wanna-go";
const PS_NOT_INTERESTED  = "not-interested";
const PLACE_SENSE_IDS    = [ PS_YES_LOVED_IT_ID, PS_YES_MEH_ID, PS_YES_HATED_IT_ID, PS_NO_WANNA_GO, PS_NOT_INTERESTED ];

function onMapClick(e) {
    closePlaceSenseWindowAndRemoveMarker();
    
    // Attempt to find nearest place to the click point.
    gRevGeocodeLookup.getPlaceAtLocation(e.latLng.lat(), e.latLng.lng(), onSuccessfulPlaceLookup);
}

function onSuccessfulPlaceLookup(placeInfo) {
    var latLng = {lat: placeInfo.lat, lng: placeInfo.lng};
    if (placeInfo.name) {
        showPlaceSenseWindowWithInfo(latLng, placeInfo);
    } else {
        showPlaceSenseWindow(latLng);
    }
}

function showPlaceSenseWindowWithInfo(latLng, placeInfo) {
    storeCurrentPlace(latLng, placeInfo);
    var marker = createMarker(latLng, placeInfo.name);
    // Render the place sense window after the marker has been drawn for a smoother effect (at least in Chrome).
    window.setTimeout(function() {
        showPlaceSenseWindow(latLng, placeInfo.name, marker);
    }, 100);
}

function storeCurrentPlace(latLng, placeInfo) {
    gPlace = { name: placeInfo.name, countryCode: placeInfo.countryCode, lat: latLng.lat, lng: latLng.lng };
}

function showPlaceSenseWindow(latLng, placeName, marker) {
    createPlaceSenseWindowIfAbsent();
    configurePlaceSenseWindow(latLng, placeName, marker);
    setCurrentMarker(marker);
    openPlaceSenseWindow(marker);
}

function createPlaceSenseWindowIfAbsent() {
    if (gPlaceSenseWindow == null) {
        gPlaceSenseWindow = new google.maps.InfoWindow({
            disableAutoPan: true,
        });
        gPlaceSenseWindow.addListener("closeclick", onPlaceSenseWindowCancel);
        gPlaceSenseWindow.addListener("domready", onPlaceSenseWindowReady);
    } 
}

function onPlaceSenseWindowReady() {
    $("#lagalag-place-sense-save").click(onPlaceSenseWindowSave);
    $("#lagalag-place-sense-cancel").click(onPlaceSenseWindowCancel);
    recenterMapOnPlaceSenseWindow();
}

function configurePlaceSenseWindow(latLng, placeName, marker) {
    var content = generatePlaceSenseWindowContent(latLng, placeName);
    gPlaceSenseWindow.setContent(content);
    if (!marker) {
        gPlaceSenseWindow.setPosition(latLng);
    }
}

function generatePlaceSenseWindowContent(latLng, placeName) {
    if (placeName) {
        $("#lagalag-place-name").text(placeName);
        var content = $("#lagalag-place-sense-window-div").html();
    } else {
        var content = $("#lagalag-nowhere-window-div").html();
    }
    return content;
}

function openPlaceSenseWindow(marker) {
    openInfoWindowInMap(gPlaceSenseWindow, marker);
    gPlaceSenseWindow.isOpen = true;
}

function closePlaceSenseWindow() {
    if (gPlaceSenseWindow != null) {
        gPlaceSenseWindow.close();
        gPlaceSenseWindow.isOpen = false;
    }
}

function closePlaceSenseWindowAndRemoveMarker() {
    if (gPlaceSenseWindow != null) {
        closePlaceSenseWindow();
        removeCurrentMarkerFromMap();
    }
}

function onZoomChanged() {
    if (gPlaceSenseWindow && gPlaceSenseWindow.isOpen) {
        recenterMapOnPlaceSenseWindow();
    }
}

function recenterMapOnPlaceSenseWindow() {
    var center = gPlaceSenseWindow.getPosition();
    if (gPlaceSenseWindow.anchor && gPlaceSenseWindow.anchor.anchorPoint) {
        // Recompute the map center based on the window's anchor point.
        center = offsetLatLngBy(center, 
                                gPlaceSenseWindow.anchor.anchorPoint.x, 
                                gPlaceSenseWindow.anchor.anchorPoint.y);
    }
    centerMapOn(center);
}

function onPlaceSenseWindowSave() {
    var placeSenseData = getPlaceSenseData();
    console.log("Saving placeSenseData: " + JSON.stringify(placeSenseData));
    postJSON("/place-sense", placeSenseData).fail(function() {
        console.error("Unable to save place sense for current place: " + placeSenseData.placeName)
    });
    closePlaceSenseWindow();
    clearCurrentMarker();
}

function getPlaceSenseData() {
    var placeSense = getSelectedPlaceSense();
    var placeSenseData = { 
        placeName: gPlace.name, 
        countryCode: gPlace.countryCode, 
        lat: gPlace.lat, 
        lng: gPlace.lng, 
        placeSense: placeSense 
    }
    return placeSenseData;
}

function getSelectedPlaceSense() {
    for (var i = 0; i < PLACE_SENSE_IDS.length; i++) {
        var placeSenseId = PLACE_SENSE_IDS[i];
        var placeSenseElem = $("#" + placeSenseId);
        if (placeSenseElem.is(":checked")) {
            var placeSense = placeSenseId;
        }
    }
    return placeSense;
}

function onPlaceSenseWindowCancel() {
    closePlaceSenseWindowAndRemoveMarker();
}
