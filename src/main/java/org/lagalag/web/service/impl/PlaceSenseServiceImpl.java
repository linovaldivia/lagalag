package org.lagalag.web.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.lagalag.web.model.entity.Place;
import org.lagalag.web.model.entity.PlaceSense;
import org.lagalag.web.repository.PlaceSenseRepository;
import org.lagalag.web.service.PlaceSenseService;
import org.lagalag.web.service.PlaceSenseStats;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlaceSenseServiceImpl implements PlaceSenseService {
    @Autowired
    private PlaceSenseRepository placeSenseRepository;
    
    @Override
    public PlaceSenseStats getStats() {
        PlaceSenseStats stats = new PlaceSenseStats();
        Set<String> visitedCountries = new HashSet<>();
        Iterable<PlaceSense> placeSenses = placeSenseRepository.findAll();
        for (PlaceSense placeSense : placeSenses) {
            // TODO only add to visitedCountries if sense = "yes"
            Place place = placeSense.getPlace();
            visitedCountries.add(place.getCountryCode());
        }
        // TODO compute stats correctly
        stats.numVisitedCountries = visitedCountries.size();
        stats.numVisitedPlaces = (int)placeSenseRepository.count();
        return stats;
    }

    @Override
    public void save(PlaceSense placeSense) {
        placeSenseRepository.save(placeSense);
    }

}
