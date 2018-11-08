package org.lagalag.web.model.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Place {
    private String name;
    private String countryCode;
    private double lat;
    private double lng;
}
