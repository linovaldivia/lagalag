package org.lagalag.web.model.transfer;

import lombok.ToString;

/**
 * Response DTO after saving "Place Sense" data (place info + user's sense of a place).
 * Pure "data structure" object with no logic, so all fields are public.
 *
 */
@ToString
public class SavePlaceSenseResponseDTO {
    public PlaceSenseStatsDTO stats;
}
