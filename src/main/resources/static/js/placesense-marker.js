/**
 * Functions related to the display and handling of the map markers.
 * Requires sense to be loaded first in the containing document.
 */
function PlaceSenseMarker(lagamap, latLng, title) {
    const MARKER_URLS = {};
    MARKER_URLS[Sense.YES_LOVED_IT_ID]   = "http://maps.google.com/mapfiles/ms/micons/red-dot.png";
    MARKER_URLS[Sense.YES_MEH_ID]        = "http://maps.google.com/mapfiles/ms/micons/yellow-dot.png";
    MARKER_URLS[Sense.YES_HATED_IT_ID]   = "http://maps.google.com/mapfiles/ms/micons/purple-dot.png";
    MARKER_URLS[Sense.NO_WANNA_GO_ID]    = "http://maps.google.com/mapfiles/ms/micons/green-dot.png";
    MARKER_URLS[Sense.NOT_INTERESTED_ID] = "http://maps.google.com/mapfiles/ms/micons/blue-dot.png";
    const MARKER_URL_UNKNOWN             = "http://maps.google.com/mapfiles/ms/micons/ltblue-dot.png";
    
    var mGoogMarker = new google.maps.Marker({
        position: latLng,
        map: lagamap.getGoogleMap(),
        title: title,
        icon: {
            url: MARKER_URL_UNKNOWN
        }
    });
    var mPlaceSense = null;
    var mHasClickHandler = false;
    
    this.setPlaceSense = function(placeSense) {
        mPlaceSense = placeSense;
        var markerUrl = MARKER_URLS[placeSense.sense];
        mGoogMarker.setIcon(markerUrl);
    }
    
    this.getPlaceSense = function() {
        return mPlaceSense;
    }

    this.isTemporary = function() {
        return !mPlaceSense;
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