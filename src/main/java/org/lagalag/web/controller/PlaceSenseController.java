package org.lagalag.web.controller;

import org.lagalag.web.model.entity.PlaceSense;
import org.lagalag.web.model.transfer.PlaceSenseDTO;
import org.lagalag.web.model.transfer.PlaceSenseStatsDTO;
import org.lagalag.web.model.transfer.SavePlaceSenseResponseDTO;
import org.lagalag.web.service.PlaceSenseService;
import org.lagalag.web.service.PlaceSenseStats;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PlaceSenseController {
    @Autowired
    private ModelMapper dtoEntityMapper;
    
    @Autowired
    private PlaceSenseService placeSenseService;
    
    @PostMapping("/place-sense")
    public SavePlaceSenseResponseDTO savePlaceSense(@RequestBody PlaceSenseDTO placeSenseDTO) {
        System.out.println("*** RECEIVED: " + placeSenseDTO);
        PlaceSense placeSense = dtoEntityMapper.map(placeSenseDTO, PlaceSense.class);
        System.out.println("Entity: " + placeSense);
        placeSense = placeSenseService.save(placeSense);
        
        SavePlaceSenseResponseDTO respDTO = new SavePlaceSenseResponseDTO();
        respDTO.placeSenseId = placeSense.getId();
        PlaceSenseStats stats = placeSenseService.getStats();
        respDTO.stats = dtoEntityMapper.map(stats, PlaceSenseStatsDTO.class);
        return respDTO;
    }
}
