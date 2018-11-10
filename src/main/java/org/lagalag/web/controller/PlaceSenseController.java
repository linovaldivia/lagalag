package org.lagalag.web.controller;

import org.lagalag.web.model.entity.PlaceSense;
import org.lagalag.web.model.transfer.PlaceSenseDTO;
import org.lagalag.web.model.transfer.PlaceSenseStatsDTO;
import org.lagalag.web.model.transfer.SavePlaceSenseResponseDTO;
import org.lagalag.web.service.PlaceSenseService;
import org.lagalag.web.service.PlaceSenseStats;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PlaceSenseController {
    private static final Logger logger = LoggerFactory.getLogger("lagalag");
    
    @Autowired
    private ModelMapper dtoEntityMapper;
    
    @Autowired
    private PlaceSenseService placeSenseService;
    
    @PostMapping("/place-sense")
    public SavePlaceSenseResponseDTO savePlaceSense(@RequestBody PlaceSenseDTO placeSenseDTO) {
        logger.debug("Received: " + placeSenseDTO);
        PlaceSense placeSense = dtoEntityMapper.map(placeSenseDTO, PlaceSense.class);
        logger.debug("Mapped to Entity: " + placeSense);
        PlaceSense savedPlaceSense = placeSenseService.save(placeSense);
        
        SavePlaceSenseResponseDTO respDTO = new SavePlaceSenseResponseDTO();
        respDTO.placeSenseId = savedPlaceSense.getId();
        PlaceSenseStats stats = placeSenseService.getStats();
        respDTO.stats = dtoEntityMapper.map(stats, PlaceSenseStatsDTO.class);
        logger.debug("Returning: " + respDTO);
        return respDTO;
    }
}
