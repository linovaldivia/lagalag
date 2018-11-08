package org.lagalag.web.controller;

import org.lagalag.web.model.entity.PlaceAndSense;
import org.lagalag.web.model.transfer.PlaceAndSenseDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PlaceSenseController {
    @Autowired
    private ModelMapper dtoToEntityMapper;
    
    @PostMapping("/place-sense")
    public void savePlaceSense(@RequestBody PlaceAndSenseDTO placeSenseDTO) {
        // TODO save to datastore
        System.out.println("*** RECEIVED: " + placeSenseDTO);
        PlaceAndSense placeAndSense = dtoToEntityMapper.map(placeSenseDTO, PlaceAndSense.class);
        System.out.println("Entity: " + placeAndSense);
    }
}
