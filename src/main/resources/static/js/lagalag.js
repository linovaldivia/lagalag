/**
 * lagalag javascript functions.
 * Requires jquery, revgeocode to be loaded first in the containing document.
 */
var gLagamap = null;
var gPlaceSenseWindow = null;
var gCurrentMarker = null;
var gPlace = null;
var gRevGeocodeLookup = new RevGeocodeLookupService();

const PS_YES_LOVED_IT_ID = "yes-love";
const PS_YES_MEH_ID      = "yes-meh";
const PS_YES_HATED_IT_ID = "yes-hate";
const PS_NO_WANNA_GO     = "no-wanna-go";
const PS_NOT_INTERESTED  = "not-interested";
const PLACE_SENSE_IDS    = [ PS_YES_LOVED_IT_ID, PS_YES_MEH_ID, PS_YES_HATED_IT_ID, PS_NO_WANNA_GO, PS_NOT_INTERESTED ];

function initMap() {
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
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        styles: mapStyles
    };
    
    gLagamap = new google.maps.Map(mapCanvasElm, mapOptions);
    
    gLagamap.addListener("click", onMapClick);
    gLagamap.addListener("zoom_changed", onZoomChanged);
    
    console.log("Map created!");
}

function onMapClick(e) {
    closePlaceSenseWindowAndRemoveMarker();
    
    // Attempt to find nearest city(ies) to the click point.
    gRevGeocodeLookup.getPlaceAtLocation(e.latLng.lat(), e.latLng.lng(), function(placeInfo) {
        // Place a marker only if we have a named place in the map.
        if (placeInfo.name) {
            storeCurrentPlace(e.latLng, placeInfo);
            var marker = createMarker(e.latLng, placeInfo.name);
            // Render the place sense window after the marker has been drawn for a smoother effect (at least in Chrome).
            window.setTimeout(function() {
                showPlaceSenseWindow(e.latLng, placeInfo.name, marker);
            }, 100);
        } else {
            showPlaceSenseWindow(e.latLng);
        }
    });
}

function storeCurrentPlace(latLng, placeInfo) {
    gPlace = { name: placeInfo.name, countryCode: placeInfo.countryCode, lat: latLng.lat(), lng: latLng.lng() };
}

function showPlaceSenseWindow(latLng, placeName, marker) {
    if (gPlaceSenseWindow == null) {
        gPlaceSenseWindow = new google.maps.InfoWindow({
            disableAutoPan: true,
        });
        gPlaceSenseWindow.addListener("closeclick", onPlaceSenseWindowCancel);
        gPlaceSenseWindow.addListener("domready", function() {
            $("#lagalag-place-sense-save").click(onPlaceSenseWindowSave);
            $("#lagalag-place-sense-cancel").click(onPlaceSenseWindowCancel);
            recenterMapOnPlaceSenseWindow();
        });
    } 
    
    var content = generatePlaceSenseWindowContent(latLng, placeName);
    gPlaceSenseWindow.setContent(content);
    if (!marker) {
        gPlaceSenseWindow.setPosition(latLng);
    }

    setCurrentMarker(marker);
    gPlaceSenseWindow.open(gLagamap, marker);
    gPlaceSenseWindow.isOpen = true;
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

function createMarker(latLng, placeName) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: gLagamap,
        title: placeName
      });
    return marker;
}

function setCurrentMarker(marker) {
    gCurrentMarker = marker;
}

function clearCurrentMarker() {
    gCurrentMarker = null;
}

function removeCurrentMarkerFromMap() {
    if (gCurrentMarker) {
        gCurrentMarker.setMap(null);
    }
    clearCurrentMarker();
}

function closePlaceSenseWindow() {
    if (gPlaceSenseWindow != null) {
        gPlaceSenseWindow.close();
        gPlaceSenseWindow.isOpen = false;
    }
}

function closePlaceSenseWindowAndRemoveMarker() {
    if (gPlaceSenseWindow != null) {
        closePlaceSenseWindow();
        removeCurrentMarkerFromMap();
    }
}

function onZoomChanged() {
    if (gPlaceSenseWindow && gPlaceSenseWindow.isOpen) {
        recenterMapOnPlaceSenseWindow();
    }
}

function recenterMapOnPlaceSenseWindow() {
    var center = gPlaceSenseWindow.getPosition();
    if (gPlaceSenseWindow.anchor && gPlaceSenseWindow.anchor.anchorPoint) {
        // Recompute the map center based on the window's anchor point.
        center = offsetLatLng(center, gPlaceSenseWindow.anchor.anchorPoint.x, gPlaceSenseWindow.anchor.anchorPoint.y);
    }
    // Center the map on the place sense window.
    gLagamap.panTo(center);
}

function offsetLatLng(latLng, offX, offY) {
    // For a better understanding of world and pixel coordinates (and translating between them),
    // see https://developers.google.com/maps/documentation/javascript/coordinates 
    var worldCoord = gLagamap.getProjection().fromLatLngToPoint(latLng);
    var scale = 1 << gLagamap.getZoom();
    var pixelCoordX = Math.floor(worldCoord.x * scale) + offX;
    var pixelCoordY = Math.floor(worldCoord.y * scale) + offY;
    worldCoord.x = pixelCoordX / scale;
    worldCoord.y = pixelCoordY / scale;
    return gLagamap.getProjection().fromPointToLatLng(worldCoord);
}

function onPlaceSenseWindowSave() {
    var placeSenseData = getPlaceSenseData();
    console.log("placeSenseData: " + JSON.stringify(placeSenseData));
    $.post("/place-sense", placeSenseData).fail(function() {
        console.error("Unable to save place sense for current place: " + placeSenseData.place.name)
    });
    closePlaceSenseWindow();
    clearCurrentMarker();
}

function getPlaceSenseData() {
    var placeSense = getSelectedPlaceSense();
    return { place: gPlace, placeSense: placeSense };
}

function getSelectedPlaceSense() {
    for (var i = 0; i < PLACE_SENSE_IDS.length; i++) {
        var placeSenseId = PLACE_SENSE_IDS[i];
        var placeSenseElem = $("#" + placeSenseId);
        if (placeSenseElem.is(":checked")) {
            var placeSense = placeSenseId;
        }
    }
    return placeSense;
}

function onPlaceSenseWindowCancel() {
    closePlaceSenseWindowAndRemoveMarker();
}

$(document).ready(function() {
});
