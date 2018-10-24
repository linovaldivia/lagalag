/**
 * Reverse Geocode Lookup Service.
 * Requires jquery to be loaded first in the containing document.
 */
function RevGeocodeLookupService() {
    // Using the awesome (and free!) Nominatim reverse geocoding API 
    // (see https://wiki.openstreetmap.org/wiki/Nominatim#Reverse_Geocoding)
    var BASE_SERVICE_URL = "https://nominatim.openstreetmap.org/reverse";
    var PARAM_FORMAT = "format=json";
    var PARAM_LAT= "lat=";
    var PARAM_LON= "lon=";
    var PARAM_ZOOM = "zoom=16";
    var PARAM_ADDR_DETAILS = "addressdetails=1";
    
    /**
     * Given a location (specified by latitude and longitude), return the name(s) of place(s) at or near that location.
     */ 
    this.getPlaceAtLocation = function(lat, lng, callback) {
        var lookupUrl = getLookupUrl(lat, lng);
        // console.log(lookupUrl);
        $.get(lookupUrl, function(data) {
            // console.info(data);
            var placeInfo = getPlaceInfo(lat, lng, data);
            callback(placeInfo);
        });
    }
    
    function getLookupUrl(lat, lng) {
        return BASE_SERVICE_URL + "?" + 
               PARAM_FORMAT + "&" +
               PARAM_LAT + lat + "&" + 
               PARAM_LON + lng + "&" +
               PARAM_ZOOM + "&" +
               PARAM_ADDR_DETAILS;
    }
        
    function getPlaceInfo(lat, lng, data) {
        var placeInfo = { lat: lat, lng: lng };
        if (data && data.address) {
            if (data.address.country_code) {
                placeInfo.countryCode = data.address.country_code.toUpperCase();
            }
            if (data.address.city) {
                placeInfo.name = data.address.city;
            } else if (data.address.town) {
                placeInfo.name = data.address.town;
            } else if (data.address.village) {
                placeInfo.name = data.address.village;
            } else {
                // The place name could be under a different property name (e.g. "hamlet"?)
                console.log(data.address);
            }
        }
        return placeInfo;
    }
        
}