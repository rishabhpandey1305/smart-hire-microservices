package com.smarthire.auth.controller;

import com.smarthire.auth.dto.LoginRequest;
import com.smarthire.auth.dto.LoginResponse;
import com.smarthire.auth.dto.RegisterRequest;
import com.smarthire.auth.response.ApiResponse;
import com.smarthire.auth.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> register(
            @Valid @RequestBody RegisterRequest request) {

        String message = authService.register(request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        message,
                        null,
                        LocalDateTime.now()
                )
        );
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(
            @Valid @RequestBody LoginRequest request) {

        LoginResponse response = authService.login(request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Login Successful",
                        response,
                        LocalDateTime.now()
                )
        );
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<String>> profile(
            Authentication authentication) {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Profile fetched successfully",
                        "Welcome " + authentication.getName(),
                        LocalDateTime.now()
                )
        );
    }
}