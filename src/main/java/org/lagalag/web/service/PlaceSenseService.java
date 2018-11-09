package org.lagalag.web.service;

import org.lagalag.web.model.entity.PlaceSense;

public interface PlaceSenseService {
    PlaceSenseStats getStats();
    void save(PlaceSense placeSense);
}
