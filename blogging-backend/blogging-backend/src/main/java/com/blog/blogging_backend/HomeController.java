package com.blog.blogbackend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Welcome to Online Blogging Platform Backend!";
    }

    @GetMapping("/api/health")
    public String health() {
        return "Backend is running successfully!";
    }
}