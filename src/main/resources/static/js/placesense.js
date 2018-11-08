function PlaceSense(placeInfo, latLng, sense) {
    this.placeName = placeInfo.name;
    this.placeCountryCode = placeInfo.countryCode;
    this.placeLatLng = latLng;
    this.sense = sense;
}

function LagalatLng(lat, lng) {
    this.lat = lat;
    this.lng = lng;
}