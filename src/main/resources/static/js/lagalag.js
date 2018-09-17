/**
 * lagalag javascript functions.
 * Requires jquery, revgeocode to be loaded first in the containing document.
 */
var lagamap = null;
var currentInfoWindow = null;
var revGeocodeLookup = new RevGeocodeLookupService();

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
    revGeocodeLookup.getPlaceNamesAtLocation(e.latLng.lat(), e.latLng.lng(), function(placeName) {
        var content = generateInfoWindowContent(placeName, e.latLng);
        showInfoWindow(content, e.latLng);
    });
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
    var content = "<div class='lagalag-infowindow'>";

    if (placeName) {
        content += "<div class='placename'>Have you been to <b>" + placeName + "</b>?</div>" +
                   "<ul>" +
                   "  <li><label class='fancy-checkbox'><input type='checkbox'/><span class='been-there'></span> Been there!</label></li>" +
                   "  <li><label class='fancy-checkbox'><input type='checkbox'/><span class='wanna-go'></span> Want to visit!</label></li>" +
                   "  <li><label class='fancy-checkbox'><input type='checkbox'/><span class='loved-it'></span> Loved it!</label></li>" +
                   "  <li><label class='fancy-checkbox'><input type='checkbox'/><span class='hated-it'></span> Hated it!</label></li>" +
                   "  <li><label class='fancy-checkbox'><input type='checkbox'/><span class='no-thanks'></span> Not interested</label></li>" +
                   "</ul>";
    } else {
        content += "Try clicking elsewhere!" +
                   "<br/><br/>Lat: " + latLng.lat().toFixed(3) + 
                   "<br/>Long: " + latLng.lng().toFixed(3);
    }
    content += "</div>"
    return content;
}


$(document).ready(function () {
    console.log("Document ready!");
});