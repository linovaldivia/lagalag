package org.lagalag.web.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Encapsulates Spring-related programmatic application configuration.
 *
 */
@Configuration
public class WebConfigurer implements WebMvcConfigurer {
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
	    // With Spring MVC we have to explicitly specify the location of static resources.
	    // Map requests to "/res/" to resources copied from "src/main/static" to "classes/static" 
	    // (see structure under the "target" directory generated when building the app).
	    // Note that Spring automatically looks for resources in some default directories 
	    // (relative from the application root), but apparently it won't look in ALL of them, just
	    // the first one that it finds -- i.e. if it finds "/public" first, it will ignore "/static").
	    // (https://spring.io/blog/2013/12/19/serving-static-web-content-with-spring-boot)
	    registry.addResourceHandler("/res/**")
	            .addResourceLocations("classpath:/static/");
	}
}
