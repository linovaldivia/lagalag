function Place(placeInfo, latLng) {
    this.name = placeInfo.name;
    this.countryCode = placeInfo.countryCode;
    this.lat = latLng.lat;
    this.lng = latLng.lng;
}

function PlaceAndSense(place, placeSense) {
    this.place = place;
    this.placeSense = placeSense;
}