package org.lagalag.web.model.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@EqualsAndHashCode
@ToString
public class PlaceAndSense {
    private Place place;
    private String placeSense;
}
