package org.lagalag.web.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LagalagController {
    
    @GetMapping("/")
    public String homePage(Model model) {
        return "index";
    }
}
