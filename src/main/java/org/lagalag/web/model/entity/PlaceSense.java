package org.lagalag.web.model.entity;

import lombok.Data;

@Data
public class PlaceSense {
    private Long id;
    private Place place;
    private String sense;
}
