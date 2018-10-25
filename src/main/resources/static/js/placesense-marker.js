/**
 * Functions related to the display and handling of the "place sense" markers.
 */
function PlaceSenseMarkerManager(lagamap) {
    var gCurrentMarker = null;
    
    this.createMarker = function(latLng, title) {
        var map = lagamap.getGoogleMap();
        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: title
          });
        return marker;
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


