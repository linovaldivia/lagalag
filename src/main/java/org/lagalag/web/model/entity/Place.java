package org.lagalag.web.model.entity;

import lombok.Data;

@Data
public class Place {
    private Long id;
    private String name;
    private String countryCode;
    private LatLng latLng;
}
