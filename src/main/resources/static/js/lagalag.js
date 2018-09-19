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
        // Place a marker only if we have a named place in the map.
        if (placeName) {
            var marker = placeMarker(e.latLng, placeName);
        }
        var content = generateInfoWindowContent(e.latLng, placeName);
        showInfoWindow(e.latLng, content, marker);
    });
}

function closeInfoWindow() {
    if (currentInfoWindow != null) {
        currentInfoWindow.close();
    }
}

function showInfoWindow(latLng, content, marker) {
    var infoWindowOptions = {
        content: content,
    };
    if (marker == undefined) {
        // No marker created, so use the specified lat/lng instead.
        infoWindowOptions.position = latLng;
    }
    currentInfoWindow = new google.maps.InfoWindow(infoWindowOptions);
    currentInfoWindow.open(lagamap, marker);
}

function generateInfoWindowContent(latLng, placeName) {
    var content = "<div class='lagalag-infowindow'>";

    // TODO find a way to move this to the HTML instead of generating with js?
    if (placeName) {
        content += "<div class='placename'>Have you been to <b>" + placeName + "</b>?</div>" +
                   "<ul>" +
                   "  <li><label class='fancy-checkbox'><input type='checkbox'/><span class='yes-loved-it'>Yes, I loved it!</span></label></li>" +
                   "  <li><label class='fancy-checkbox'><input type='checkbox'/><span class='yes-meh'>Yes, it was ok.</span></label></li>" +
                   "  <li><label class='fancy-checkbox'><input type='checkbox'/><span class='yes-hated-it'>Yes, I hated it!</span></label></li>" +
                   "  <li><label class='fancy-checkbox'><input type='checkbox'/><span class='no-wanna-go'>No, but I want to visit!</span></label></li>" +
                   "  <li><label class='fancy-checkbox'><input type='checkbox'/><span class='not-interested'>Nope, not interested</span></label></li>" +
                   "</ul>";
    } else {
        content += "Try clicking elsewhere!" +
                   "<br/><br/>Lat: " + latLng.lat().toFixed(3) + 
                   "<br/>Long: " + latLng.lng().toFixed(3);
    }
    content += "</div>"
    return content;
}

function placeMarker(latLng, placeName) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: lagamap,
        title: placeName
      });
    return marker;
}

$(document).ready(function () {
    console.log("Document ready!");
});