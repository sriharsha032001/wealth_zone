package com.transactions;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

import io.micrometer.common.lang.NonNull;

@Configuration
public class config implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
    
}

