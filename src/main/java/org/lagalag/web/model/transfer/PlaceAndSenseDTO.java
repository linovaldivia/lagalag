package org.lagalag.web.model.transfer;

/**
 * DTO for "Place Sense" data (place info + user's sense of a place).
 * Pure "data structure" object with no logic, so all fields are public.
 *
 */
public class PlaceAndSenseDTO {
    public PlaceDTO place;
    public String placeSense;
    
    @Override
    public String toString() {
        return "PlaceAndSenseDTO [place=" + place + ", placeSense=" + placeSense + "]";
    }
}
