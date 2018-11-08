package org.lagalag.web.controller;

import org.lagalag.web.model.entity.PlaceSense;
import org.lagalag.web.model.transfer.PlaceSenseDTO;
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
    public void savePlaceSense(@RequestBody PlaceSenseDTO placeSenseDTO) {
        // TODO save to datastore
        System.out.println("*** RECEIVED: " + placeSenseDTO);
        PlaceSense placeSense = dtoToEntityMapper.map(placeSenseDTO, PlaceSense.class);
        System.out.println("Entity: " + placeSense);
    }
}
