package org.lagalag.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

@SpringBootApplication
@ControllerAdvice
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
	
    @ModelAttribute
    public void setModelAttributes(Model model) {
        model.addAttribute("bootstrapVersion", "4.1.3");
        model.addAttribute("jqueryVersion", "3.3.1-1");
        model.addAttribute("faVersion", "5.3.1");
    }
}
