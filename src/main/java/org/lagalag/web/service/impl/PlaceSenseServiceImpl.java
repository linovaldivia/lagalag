package org.lagalag.web.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.lagalag.web.model.entity.Place;
import org.lagalag.web.model.entity.PlaceSense;
import org.lagalag.web.model.entity.Sense;
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
        Iterable<PlaceSense> placeSenses = placeSenseRepository.findAll();
        return computeStats(placeSenses);
    }

    @Override
    public PlaceSense save(PlaceSense placeSense) {
        return placeSenseRepository.save(placeSense);
    }
    
    private PlaceSenseStats computeStats(Iterable<PlaceSense> placeSenses) {
        PlaceSenseStats stats = new PlaceSenseStats();
        Set<String> visitedCountries = new HashSet<>();
        for (PlaceSense placeSense : placeSenses) {
            collectStats(placeSense, stats, visitedCountries);
        }
        stats.numVisitedCountries = visitedCountries.size();
        return stats;
    }
    
    private void collectStats(PlaceSense placeSense, PlaceSenseStats stats, Set<String> visitedCountries) {
        Sense sense = placeSense.getSense();
        if (sense.impliesVisited()) {
            stats.numVisitedPlaces++;
            Place place = placeSense.getPlace();
            visitedCountries.add(place.getCountryCode());
        }
        if (sense == Sense.YES_LOVED_IT) {
            stats.numLovedPlaces++;
        }
        if (sense == Sense.NO_WANNA_GO) {
            stats.numWannaGoPlaces++;
        }
    }
}
