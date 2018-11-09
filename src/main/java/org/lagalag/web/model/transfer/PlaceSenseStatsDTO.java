package org.lagalag.web.model.transfer;

import lombok.ToString;

/**
 * DTO containing user's PlaceSense statistics.
 * Pure "data structure" object with no logic, so all fields are public.
 *
 */
@ToString
public class PlaceSenseStatsDTO {
    public int numVisitedPlaces;
    public int numWannaGoPlaces;
    public int numLovedPlaces;
    public int numVisitedCountries;
}
