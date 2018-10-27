/**
 * Reverse Geocode Lookup Service.
 * Requires jquery to be loaded first in the containing document.
 */
function RevGeocodeLookupService() {
    // Using the awesome (and free!) Nominatim reverse geocoding API 
    // (see https://wiki.openstreetmap.org/wiki/Nominatim#Reverse_Geocoding)
    const BASE_SERVICE_URL = "https://nominatim.openstreetmap.org/reverse";
    const PARAM_FORMAT = "format=json";
    const PARAM_LAT= "lat=";
    const PARAM_LON= "lon=";
    const PARAM_ZOOM = "zoom=16";
    const PARAM_ADDR_DETAILS = "addressdetails=1";
    const PLACE_PROPERTIES_ORDER = ["city", "town", "village", "state", "region"];
    
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
            placeInfo.name = getPlaceName(data.address);
        }
        return placeInfo;
    }
    
    function getPlaceName(address) {
        for (var i = 0; i < PLACE_PROPERTIES_ORDER.length; i++) {
            var placeProp = PLACE_PROPERTIES_ORDER[i];
            if (address[placeProp]) {
                return address[placeProp];
            }
        }
        // The place name could be under a different property name (e.g. "hamlet"?)
        console.log(address);
    }
        
}