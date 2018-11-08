/**
 * Functions related to the display and handling of the "place sense" window.
 * Requires jquery, lagamap, sense, placesense-marker to be loaded first in the containing document.
 */
function PlaceSenseWindow(lagamap, onSaveCallback, onCancelCallback) {
    var mGoogWindow = null;
    var mSelectedSense = null;
    var self = this;

    const DEFAULT_SENSE = Sense.YES_LOVED_IT_ID;

    this.open = function(latLng, placeName, marker, selectedSense) {
        createWindowIfAbsent();
        configureWindow(latLng, placeName, marker);
        mSelectedSense = selectedSense;
        openWindow(marker);
    }
    
    this.close = function() {
        if (mGoogWindow != null) {
            mGoogWindow.close();
            mGoogWindow.isOpen = false;
        }
    }
    
    function createWindowIfAbsent() {
        if (mGoogWindow == null) {
            mGoogWindow = new google.maps.InfoWindow({
                disableAutoPan: true,
            });
            mGoogWindow.addListener("closeclick", onCancelCallback);
            mGoogWindow.addListener("domready", onWindowReady);
        } 
    }

    function onWindowReady() {
        $("#lagalag-place-sense-save").click(onSaveButtonPressed);
        $("#lagalag-place-sense-cancel").click(onCancelCallback);
        setSelectedSense();
        self.recenterMapOnWindow();
    }
    
    function configureWindow(latLng, placeName, marker) {
        var content = generateWindowContent(latLng, placeName);
        mGoogWindow.setContent(content);
        if (!marker) {
            mGoogWindow.setPosition(latLng);
        }
    }
    
    this.recenterMapOnWindow = function() {
        var center = mGoogWindow.getPosition();
        if (mGoogWindow.anchor && mGoogWindow.anchor.anchorPoint) {
            // Recompute the map center based on the window's anchor point.
            center = lagamap.offsetLatLngBy(center, 
                                            mGoogWindow.anchor.anchorPoint.x, 
                                            mGoogWindow.anchor.anchorPoint.y);
        }
        lagamap.centerMapOn(center);
    }

    function generateWindowContent(latLng, placeName) {
        if (placeName) {
            $("#lagalag-place-name").text(placeName);
            var content = $("#lagalag-place-sense-window-div").html();
        } else {
            var content = $("#lagalag-nowhere-window-div").html();
        }
        return content;
    }
    
    function openWindow(marker) {
        var map = lagamap.getGoogleMap();
        if (marker) {
            var googleMarker = marker.getGoogleMarker(); 
        }
        mGoogWindow.open(map, googleMarker);
        mGoogWindow.isOpen = true;
    }
    
    function onSaveButtonPressed() {
        var selectedSense = getSelectedSense();
        onSaveCallback(selectedSense);
    }
    
    function setSelectedSense() {
        var selSense = (mSelectedSense ? mSelectedSense : DEFAULT_SENSE);
        var senseElem = $("#" + selSense);
        senseElem.prop("checked", true);
    }
    
    function getSelectedSense() {
        var selSense = null;
        $.each(Sense, function(key, value) {
            var senseId = value;
            var senseElem = $("#" + senseId);
            if (senseElem.is(":checked")) {
                selSense = senseId;
            }
        });
        return selSense;
    }
    
    this.isOpen = function() {
        return ((mGoogWindow != null) && mGoogWindow.isOpen);
    }
}
