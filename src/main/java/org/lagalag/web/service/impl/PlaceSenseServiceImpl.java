package org.lagalag.web.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.lagalag.web.model.entity.Place;
import org.lagalag.web.model.entity.PlaceSense;
import org.lagalag.web.service.PlaceSenseService;
import org.springframework.stereotype.Service;

@Service
public class PlaceSenseServiceImpl implements PlaceSenseService {
    private Set<PlaceSense> placeSenses = new HashSet<>();
    private Set<String> countries = new HashSet<>();
    
    @Override
    public int getPlacesCount() {
        return placeSenses.size();
    }

    @Override
    public int getCountriesCount() {
        return countries.size();
    }

    @Override
    public void save(PlaceSense placeSense) {
        // TODO even in a "fake db" we need to handle upserts (new record vs update existing rec)
        placeSenses.add(placeSense);
        Place place = placeSense.getPlace();
        countries.add(place.getCountryCode());
    }

}
