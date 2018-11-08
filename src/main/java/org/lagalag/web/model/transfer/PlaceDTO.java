package org.lagalag.web.model.transfer;

/**
 * DTO for Place data.
 * Pure "data structure" object with no logic, so all fields are public.
 *
 */
public class PlaceDTO {
    public String name;
    public String countryCode;
    public double lat;
    public double lng;

    @Override
    public String toString() {
        return "[name=" + name + ", countryCode=" + countryCode + ", lat=" + lat + ", lng=" + lng + "]";
    }
}
