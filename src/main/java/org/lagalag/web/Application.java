package org.lagalag.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication automatically adds the following:
// @Configuration (tags the class as a source of bean definitions for the application context).
// @EnableAutoConfiguration (tells Spring Boot to start adding beans based on classpath settings, other beans, and various property settings).
// @ComponentScan (tells Spring to look for other components, configurations, and services from the current package down)
@SpringBootApplication
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
