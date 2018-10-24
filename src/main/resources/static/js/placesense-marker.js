/**
 * Functions related to the display and handling of the "place sense" markers.
 */
var gCurrentMarker = null;

function setCurrentMarker(marker) {
    gCurrentMarker = marker;
}

function clearCurrentMarker() {
    gCurrentMarker = null;
}

function removeCurrentMarkerFromMap() {
    if (gCurrentMarker) {
        gCurrentMarker.setMap(null);
    }
    clearCurrentMarker();
}

