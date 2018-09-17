package org.lagalag.web.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.lagalag.web.controller.LagalagController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@RunWith(SpringRunner.class)
@WebMvcTest(LagalagController.class)
public class ControllerTests {
    @Autowired
    private MockMvc mvc;
    
    @Test
    public void testGetRoot()
      throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/"))
           .andExpect(MockMvcResultMatchers.status().isOk())
           .andExpect(MockMvcResultMatchers.content().contentTypeCompatibleWith(MediaType.TEXT_HTML));
    }
    
    @Test
    public void testGetMap()
      throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/map"))
           .andExpect(MockMvcResultMatchers.status().isOk())
           .andExpect(MockMvcResultMatchers.content().contentTypeCompatibleWith(MediaType.TEXT_HTML))
           // Check that the Google Maps API key is being passed to the view.
           .andExpect(MockMvcResultMatchers.model().attributeExists("apiKey"));           
    }
}
