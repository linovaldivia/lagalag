package org.lagalag.web.controller;

import org.lagalag.web.config.LagalagProperty;
import org.lagalag.web.model.transfer.PlaceSenseStatsDTO;
import org.lagalag.web.service.PlaceSenseService;
import org.lagalag.web.service.PlaceSenseStats;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Main controller for most of our current pages.
 */
@Controller
public class LagalagController {
    // Provides access to application.properties.
    @Autowired
    private Environment env;
    
    @Autowired
    private PlaceSenseService placeSenseService;
    
    @Autowired
    private ModelMapper dtoEntityMapper;
    
    @GetMapping("/")
    public String homePage(Model model) {
        PlaceSenseStats stats = placeSenseService.getStats();
        PlaceSenseStatsDTO statsDTO = dtoEntityMapper.map(stats, PlaceSenseStatsDTO.class);
        model.addAttribute("stats", statsDTO);
        return "index";
    }
    
    @GetMapping("/map")
    public String mapPage(Model model) {
        model.addAttribute("apiKey", env.getProperty(LagalagProperty.GMAPS_API_KEY));
        return "map";
    }
}
