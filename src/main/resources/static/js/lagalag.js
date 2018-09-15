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
    closeInfoWindow();
    
    // Pan and center the map on the click point.
    lagamap.panTo(e.latLng);
    
    // Attempt to find nearest city(ies) to the click point.
    reverseGeocodeLookup(e.latLng);
}

function closeInfoWindow() {
    if (currentInfoWindow != null) {
        currentInfoWindow.close();
    }
}

function showInfoWindow(content, position) {
    currentInfoWindow = new google.maps.InfoWindow({
        content: content,
        position: position
    });
    currentInfoWindow.open(lagamap);
}

function generateInfoWindowContent(placeName, latLng) {
    var content;
    if (placeName) {
        content = "Have you been to <b>" + placeName + "</b>?" +
                  "<br/><br/><input type='checkbox'> Been here" +
                  "<br/><input type='checkbox'> Want to visit";    
    } else {
        content = "Try clicking elsewhere!" +
                  "<br/><br/>Lat: " + latLng.lat().toFixed(3) + 
                  "<br/>Long: " + latLng.lng().toFixed(3);
    }
    return content;
}

function reverseGeocodeLookup(latLng) {
    var lat = latLng.lat();
    var lng = latLng.lng();
    // Using the awesome (and free!) Nominatim reverse geocoding API 
    // (https://wiki.openstreetmap.org/wiki/Nominatim#Reverse_Geocoding)
    // TODO move to its own js file for easier reuse
    var lookupUrl = "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + lat + "&lon=" + lng + "&zoom=16&addressdetails=1";
    console.log(lookupUrl);
    $.get(lookupUrl, function(data) {
        // console.info(data);
        var placeName = getPlaceName(data);
        var content = generateInfoWindowContent(placeName, latLng);
        showInfoWindow(content, latLng);
    });
}

function getPlaceName(data) {
    if (data && data.address) {
        if (data.address.city) {
            return data.address.city;
        } else if (data.address.town) {
            return data.address.town;
        } else if (data.address.village) {
            return data.address.village;
        } else {
            // The place name could be under a different property name (e.g. "hamlet"?)
            console.log(data.address);
        }
    }
}

$(document).ready(function () {
    console.log("Document ready!");
});