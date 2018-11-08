package org.lagalag.web.model.transfer;

import lombok.ToString;

/**
 * DTO for "Place Sense" data (place info + user's sense of a place).
 * Pure "data structure" object with no logic, so all fields are public.
 *
 */
@ToString
public class PlaceSenseDTO {
    public String placeName;
    public String placeCountryCode;
    public LatLngDTO placeLatLng;
    public String sense;
}
