/**
 * lagalag javascript functions.
 * Requires jquery, revgeocode to be loaded first in the containing document.
 */
var lagamap = null;
var placeSenseWindow = null;
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
    lagamap.addListener("click", onMapClick);
    
    console.log("Map created!");
}

function onMapClick(e) {
    closePlaceSenseWindow();
    
    // Attempt to find nearest city(ies) to the click point.
    revGeocodeLookup.getPlaceNamesAtLocation(e.latLng.lat(), e.latLng.lng(), function(placeName) {
        // Place a marker only if we have a named place in the map.
        if (placeName) {
            var marker = createPlaceSenseMarker(e.latLng, placeName);
            // Render the place sense window after the marker has been drawn for a smoother effect (at least in Chrome).
            window.setTimeout(function() {
                showPlaceSenseWindow(e.latLng, placeName, marker);
            }, 100);
        } else {
            showPlaceSenseWindow(e.latLng);
        }
    });
}

function closePlaceSenseWindow() {
    if (placeSenseWindow != null) {
        placeSenseWindow.close();
        // Remove the associated marker too, if there is one.
        removePlaceSenseMarker(placeSenseWindow.marker);
    }
}

function showPlaceSenseWindow(latLng, placeName, marker) {
    if (placeSenseWindow == null) {
        placeSenseWindow = new google.maps.InfoWindow({
            disableAutoPan: true,
        });
    } 
    
    var content = generatePlaceSenseWindowContent(latLng, placeName);
    placeSenseWindow.setContent(content);
    if (!marker) {
        placeSenseWindow.setPosition(latLng);
    }
    // Stash the marker associated with the window in the window itself.
    // Note that if there's no marker, it will effectively "remove" this dynamic property.
    placeSenseWindow.marker = marker;
    
    placeSenseWindow.addListener("closeclick", function() {
        // Remove the marker if the user closes the Place Sense window without saving (effectively cancelling). 
        removePlaceSenseMarker(placeSenseWindow.marker);
    });
    placeSenseWindow.addListener("domready", function() {
        // Center the map on the place sense window.
        lagamap.panTo(placeSenseWindow.getPosition());
    });
    placeSenseWindow.open(lagamap, marker);
}

function generatePlaceSenseWindowContent(latLng, placeName) {
    if (placeName) {
        $("#lagalag-place-name").text(placeName);
        var content = $("#lagalag-place-sense-window-div").html();
    } else {
        var content = $("#lagalag-nowhere-window-div").html();
    }
    return content;
}

function createPlaceSenseMarker(latLng, placeName) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: lagamap,
        title: placeName
      });
    return marker;
}

function removePlaceSenseMarker(marker) {
    if (marker) {
        // Setting the map to null removes a marker.
        marker.setMap(null);
    }
}
