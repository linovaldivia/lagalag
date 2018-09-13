package org.lagalag.web.controllers;

import org.lagalag.web.config.LagalagProperty;
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
    
    @GetMapping("/")
    public String homePage(Model model) {
        return "index";
    }
    
    @GetMapping("/map")
    public String mapPage(Model model) {
        model.addAttribute("apiKey", env.getProperty(LagalagProperty.GMAPS_API_KEY));
        return "map";
    }
}
