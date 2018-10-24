/**
 * Functions related to the creation and styling of the map itself.
 * Requires jquery to be loaded first in the containing document.
 */
var gLagamap = null;

const INITIAL_CENTER = { lat: 41.39,  lng: 2.154 };     // Barcelona!
const INITIAL_ZOOM_LEVEL = 5;                           // Note: the higher the zoom level value, the closer to ground level.
const INITIAL_MAP_STYLES = [ 
    { "stylers": [ { "hue": "#0077ff" }, { "saturation": -21 } ] },
    { "featureType": "poi", "stylers": [ { "visibility": "off" } ] },
    { "featureType": "transit", "stylers": [ { "visibility": "off" } ] }
];

// Google Maps javascript calls this function automatically when it loads successfully.
function initMap() {
    console.log("Creating map...");

    // Get native DOM element (note: not the jquery reference!).
    var mapCanvasElm = $("#map")[0];
    var mapOptions = getMapOptions();
    gLagamap = new google.maps.Map(mapCanvasElm, mapOptions);
    
    gLagamap.addListener("click", onMapClick);
    gLagamap.addListener("zoom_changed", onZoomChanged);
    
    console.log("Map created!");
}

function getMapOptions() {
    var mapOptions = {
        center: INITIAL_CENTER,
        zoom: INITIAL_ZOOM_LEVEL,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        styles: INITIAL_MAP_STYLES
    };
    return mapOptions;
}

function openInfoWindowInMap(infoWindow, marker) {
    infoWindow.open(gLagamap, marker);
}

function createMarker(latLng, title) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: gLagamap,
        title: title
      });
    return marker;
}

function centerMapOn(center) {
    gLagamap.panTo(center);
}

function offsetLatLngBy(latLng, pixelOffsetX, pixelOffsetY) {
    // For a better understanding of world and pixel coordinates (and translating between them),
    // see https://developers.google.com/maps/documentation/javascript/coordinates 
    var worldCoord = gLagamap.getProjection().fromLatLngToPoint(latLng);
    var scale = 1 << gLagamap.getZoom();
    var pixelCoordX = Math.floor(worldCoord.x * scale) + pixelOffsetX;
    var pixelCoordY = Math.floor(worldCoord.y * scale) + pixelOffsetY;
    worldCoord.x = pixelCoordX / scale;
    worldCoord.y = pixelCoordY / scale;
    return gLagamap.getProjection().fromPointToLatLng(worldCoord);
}
