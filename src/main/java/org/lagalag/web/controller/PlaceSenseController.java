package org.lagalag.web.controller;

import org.lagalag.web.data.PlaceSenseDTO;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PlaceSenseController {
    @PostMapping("/place-sense")
    public void savePlaceSense(@RequestBody PlaceSenseDTO placeSenseDTO) {
        // TODO save to datastore
        System.out.println("*** RECEIVED: " + placeSenseDTO);
    }

}
