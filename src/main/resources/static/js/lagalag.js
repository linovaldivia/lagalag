/**
 * lagalag javascript functions.
 * Requires jquery to be loaded first in the containing document.
 */
var map = null;

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
    
    map = new google.maps.Map(mapCanvasElm, mapOptions);
    
    console.log("Map created!");
}

$(document).ready(function () {
    console.log("Document ready!");
});