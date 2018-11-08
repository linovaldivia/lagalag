/**
 * Functions related to the creation and styling of the map itself.
 * Requires jquery, placesense to be loaded first in the containing document.
 */
function Lagamap(mapContainerId) {
    var mGoogMap = null;
    
    const INITIAL_CENTER = { lat: 41.39,  lng: 2.154 };     // Barcelona!
    const INITIAL_ZOOM_LEVEL = 5;                           // Note: the higher the zoom level value, the closer to ground level.
    const INITIAL_MAP_STYLES = [ 
        { "stylers": [ { "hue": "#0077ff" }, { "saturation": -21 } ] },
        { "featureType": "poi", "stylers": [ { "visibility": "off" } ] },
        { "featureType": "transit", "stylers": [ { "visibility": "off" } ] }
    ];
    const MAP_OPTIONS = {
            center: INITIAL_CENTER,
            zoom: INITIAL_ZOOM_LEVEL,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            clickableIcons: false,
            draggableCursor: "pointer",
            draggingCursor: "grabbing",
            styles: INITIAL_MAP_STYLES
    };

    this.createMap = function() {
        console.log("Creating map...");
        // Get native DOM element (note: not the jquery reference!).
        var mapCanvasElm = $("#" + mapContainerId)[0];
        mGoogMap = new google.maps.Map(mapCanvasElm, MAP_OPTIONS);
        console.log("Map created!");
    }
    
    this.onClick = function(handler) {
        mGoogMap.addListener("click", function(e) {
            var lat = e.latLng.lat();
            var lng = e.latLng.lng();
            var latLng = new LagalatLng(lat, lng);
            handler(latLng);
        });
    }
    
    this.onZoomChanged = function(handler) {
        mGoogMap.addListener("zoom_changed", handler);
    }

    this.centerMapOn = function(centerLatLng) {
        mGoogMap.panTo(centerLatLng);
    }
    
    this.offsetLatLngBy = function(latLng, pixelOffsetX, pixelOffsetY) {
        // For a better understanding of world and pixel coordinates (and translating between them),
        // see https://developers.google.com/maps/documentation/javascript/coordinates 
        var worldCoord = mGoogMap.getProjection().fromLatLngToPoint(latLng);
        var scale = 1 << mGoogMap.getZoom();
        var pixelCoordX = Math.floor(worldCoord.x * scale) + pixelOffsetX;
        var pixelCoordY = Math.floor(worldCoord.y * scale) + pixelOffsetY;
        worldCoord.x = pixelCoordX / scale;
        worldCoord.y = pixelCoordY / scale;
        return mGoogMap.getProjection().fromPointToLatLng(worldCoord);
    }
    
    // Unfortunately direct access to this field is needed by other objects, forcing us to break encapsulation...
    this.getGoogleMap = function() {
        return mGoogMap;
    }
}
