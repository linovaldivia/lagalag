package org.lagalag.web.data;

/**
 * DTO for "Place Sense" data (place info + user's sense of a place).
 * Pure "data structure" object with no logic, so all fields are public.
 *
 */
public class PlaceSenseDTO {
    public String placeName;
    public String countryCode;
    public double lat;
    public double lng;
    public String placeSense;
    
    @Override
    public String toString() {
        return "PlaceSenseDTO [name=" + placeName + ", countryCode=" + countryCode + ", lat=" + lat + ", lng=" + lng + ", placeSense=" + placeSense + "]";
    }
}
