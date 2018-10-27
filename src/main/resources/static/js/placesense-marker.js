/**
 * Functions related to the display and handling of the map markers.
 * Requires placesense to be loaded first in the containing document.
 */
function PlaceSenseMarker(lagamap, latLng, title) {
    var MARKER_URLS = {};
    MARKER_URLS[PlaceSense.YES_LOVED_IT_ID]   = "http://maps.google.com/mapfiles/ms/micons/red-dot.png";
    MARKER_URLS[PlaceSense.YES_MEH_ID]        = "http://maps.google.com/mapfiles/ms/micons/yellow-dot.png";
    MARKER_URLS[PlaceSense.YES_HATED_IT_ID]   = "http://maps.google.com/mapfiles/ms/micons/purple-dot.png";
    MARKER_URLS[PlaceSense.NO_WANNA_GO_ID]    = "http://maps.google.com/mapfiles/ms/micons/green-dot.png";
    MARKER_URLS[PlaceSense.NOT_INTERESTED_ID] = "http://maps.google.com/mapfiles/ms/micons/blue-dot.png";
    const MARKER_URL_UNKNOWN                  = "http://maps.google.com/mapfiles/ms/micons/ltblue-dot.png";
    
    var mGoogMarker = new google.maps.Marker({
        position: latLng,
        map: lagamap.getGoogleMap(),
        title: title,
        icon: {
            url: MARKER_URL_UNKNOWN
        }
    });
    var mPlaceAndSense = null;
    var mHasClickHandler = false;
    
    this.setPlaceAndSense = function(placeAndSense) {
        mPlaceAndSense = placeAndSense;
        var markerUrl = MARKER_URLS[placeAndSense.placeSense];
        mGoogMarker.setIcon(markerUrl);
    }
    
    this.getPlaceAndSense = function() {
        return mPlaceAndSense;
    }

    this.isTemporary = function() {
        return !mPlaceAndSense;
    }
    
    this.removeFromMap = function() {
        mGoogMarker.setMap(null);
    }

    this.click = function(handler) {
        if (mHasClickHandler) {
            return;
        }
        
        var self = this;
        mGoogMarker.addListener("click", function() { handler(self); });
        mHasClickHandler = true;
    }
    
    this.getGoogleMarker = function() {
        return mGoogMarker;
    }
}