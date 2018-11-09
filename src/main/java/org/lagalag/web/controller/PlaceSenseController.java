package org.lagalag.web.controller;

import org.lagalag.web.model.entity.PlaceSense;
import org.lagalag.web.model.transfer.PlaceSenseDTO;
import org.lagalag.web.model.transfer.SavePlaceSenseResponseDTO;
import org.lagalag.web.service.PlaceSenseService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PlaceSenseController {
    @Autowired
    private ModelMapper dtoToEntityMapper;
    
    @Autowired
    private PlaceSenseService placeSenseService;
    
    @PostMapping("/place-sense")
    public SavePlaceSenseResponseDTO savePlaceSense(@RequestBody PlaceSenseDTO placeSenseDTO) {
        System.out.println("*** RECEIVED: " + placeSenseDTO);
        PlaceSense placeSense = dtoToEntityMapper.map(placeSenseDTO, PlaceSense.class);
        System.out.println("Entity: " + placeSense);
        placeSenseService.save(placeSense);
        
        SavePlaceSenseResponseDTO respDTO = new SavePlaceSenseResponseDTO();
        respDTO.numPlaces = placeSenseService.getPlacesCount();
        respDTO.numCountries = placeSenseService.getCountriesCount();
        return respDTO;
    }
}
