/**
 * Functions related to the display and handling of the "place sense" markers.
 * Requires placesense to be loaded first in the containing document.
 */
function PlaceSenseMarkerManager(lagamap) {
    var gCurrentMarker = null;
    
    var MARKER_URLS = {};
    MARKER_URLS[PlaceSense.YES_LOVED_IT_ID]   = "http://maps.google.com/mapfiles/ms/micons/red-dot.png";
    MARKER_URLS[PlaceSense.YES_MEH_ID]        = "http://maps.google.com/mapfiles/ms/micons/yellow-dot.png";
    MARKER_URLS[PlaceSense.YES_HATED_IT_ID]   = "http://maps.google.com/mapfiles/ms/micons/purple-dot.png";
    MARKER_URLS[PlaceSense.NO_WANNA_GO_ID]    = "http://maps.google.com/mapfiles/ms/micons/green-dot.png";
    MARKER_URLS[PlaceSense.NOT_INTERESTED_ID] = "http://maps.google.com/mapfiles/ms/micons/blue-dot.png";
    const MARKER_URL_UNKNOWN                  = "http://maps.google.com/mapfiles/ms/micons/ltblue-dot.png";
    
    this.createMarker = function(latLng, title) {
        var map = lagamap.getGoogleMap();
        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: title,
            icon: {
                url: MARKER_URL_UNKNOWN
            }
        });
        return marker;
    }
    
    this.setMarkerPlaceAndSense = function(marker, placeAndSense) {
        marker.placeAndSense = placeAndSense;
        var markerUrl = MARKER_URLS[placeAndSense.placeSense];
        marker.setIcon(markerUrl);
    }
    
    this.getMarkerPlaceAndSense = function(marker) {
        return marker.placeAndSense;
    }

    this.isMarkerTemporary = function(marker) {
        return (!marker.placeAndSense);
    }
    
    this.setCurrentMarker = function(marker) {
        gCurrentMarker = marker;
    }
    
    this.getCurrentMarker = function() {
        return gCurrentMarker;
    }

    this.clearCurrentMarker = function() {
        gCurrentMarker = null;
    }

    this.removeCurrentMarkerFromMap = function() {
        if (gCurrentMarker) {
            gCurrentMarker.setMap(null);
        }
        this.clearCurrentMarker();
    }
}


