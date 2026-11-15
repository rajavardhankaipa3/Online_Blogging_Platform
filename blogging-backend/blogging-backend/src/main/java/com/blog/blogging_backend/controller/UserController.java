package com.blog.blogbackend.controller;

import com.blog.blogbackend.entity.User;
import com.blog.blogbackend.service.UserService;
import com.blog.blogbackend.service.JwtService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    public UserController(
            UserService userService,
            JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    public record RegisterRequest(
            @NotBlank String name,
            @NotBlank @Email String email,
            @NotBlank @Size(min = 8) String password
    ) {}

    public record LoginRequest(
            @NotBlank @Email String email,
            @NotBlank String password
    ) {}

    public record UserResponse(
            Long id, String name, String email) {}

    public record LoginResponse(
            String token,
            Long id,
            String name,
            String email
    ) {}

    @PostMapping("/register")
    public ResponseEntity<UserResponse> registerUser(
            @Valid @RequestBody RegisterRequest request) {

        User user = userService.registerUser(
                request.name(),
                request.email(),
                request.password()
        );

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new UserResponse(
                        user.getId(),
                        user.getName(),
                        user.getEmail()
                ));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(
            @Valid @RequestBody LoginRequest request) {

        User user = userService.loginUser(
                request.email(),
                request.password()
        );

        String token = jwtService.generateToken(user.getEmail());

        return ResponseEntity.ok(
                new LoginResponse(
                        token,
                        user.getId(),
                        user.getName(),
                        user.getEmail()
                )
        );
    }
}