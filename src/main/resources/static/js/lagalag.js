/**
 * lagalag javascript functions.
 * Requires jquery to be loaded first in the containing document.
 */
var lagamap = null;
var currentInfoWindow = null;

function initMap() 
{
    console.log("Creating map...");
    // Get native DOM element (not the jquery reference).
    var mapCanvasElm = $("#map")[0];
    // Coordinates of map center
    var center = {
            lat: 41.39, 
            lng: 2.154
        };
    // The higher the zoom level, the "closer" to ground level
    var zoomLevel = 5;

    var mapStyles = [ 
                     { "stylers": [ { "hue": "#0077ff" }, { "saturation": -21 } ] },
                     { "featureType": "poi", "stylers": [ { "visibility": "off" } ] },
                     { "featureType": "transit", "stylers": [ { "visibility": "off" } ] }
                    ];
    var mapOptions = {
        center: center,
        zoom: zoomLevel,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        // mapTypeId: google.maps.MapTypeId.HYBRID,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        styles: mapStyles
    };
    
    lagamap = new google.maps.Map(mapCanvasElm, mapOptions);
    
    // Add listener to the click event so we can display popups.
    lagamap.addListener('click', onMapClick);
    console.log("Map created!");
}

function onMapClick(e) {
    if (currentInfoWindow != null) {
        currentInfoWindow.close();
    }
    var content = generateInfoWindowContent(e.latLng);
    currentInfoWindow = new google.maps.InfoWindow({
        content: content,
        position: e.latLng
    });
    currentInfoWindow.open(lagamap);

    // Pan and center the map on the click point.
    lagamap.panTo(e.latLng);
}

function generateInfoWindowContent(latLng) {
    return "Lat: " + latLng.lat().toFixed(3) + 
           "<br/>Long: " + latLng.lng().toFixed(3) + 
           "<br/><input type='checkbox'> Been here" +
           "<br/><input type='checkbox'> Want to visit";    
}

$(document).ready(function () {
    console.log("Document ready!");
});