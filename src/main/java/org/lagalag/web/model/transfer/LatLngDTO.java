package org.lagalag.web.model.transfer;

import lombok.ToString;

/**
 * DTO for latitude-longitude data.
 * Pure "data structure" object with no logic, so all fields are public.
 *
 */
@ToString
public class LatLngDTO {
    public double lat;
    public double lng;
}
