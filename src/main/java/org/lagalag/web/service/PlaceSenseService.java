package org.lagalag.web.service;

import org.lagalag.web.model.entity.PlaceSense;

public interface PlaceSenseService {
    int getPlacesCount();
    int getCountriesCount();
    void save(PlaceSense placeSense);
}
