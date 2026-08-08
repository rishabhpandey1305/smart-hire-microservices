package com.smarthire.auth.service;

import com.smarthire.auth.dto.LoginRequest;
import com.smarthire.auth.dto.LoginResponse;
import com.smarthire.auth.dto.RegisterRequest;
import com.smarthire.auth.entity.User;
import com.smarthire.auth.exception.InvalidCredentialsException;
import com.smarthire.auth.exception.UserNotFoundException;
import com.smarthire.auth.repository.UserRepository;
import com.smarthire.auth.security.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    private static final Logger logger =
            LoggerFactory.getLogger(AuthService.class);

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public String register(RegisterRequest request) {

        logger.info("Registration request received for email: {}", request.getEmail());

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        userRepository.save(user);

        logger.info("User registered successfully: {}", request.getEmail());

        return "User Registered Successfully";
    }

    public LoginResponse login(LoginRequest request) {

        logger.info("Login request received for email: {}", request.getEmail());

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    logger.warn("Login failed. User not found: {}", request.getEmail());
                    return new UserNotFoundException("User Not Found");
                });

        boolean matches = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        if (!matches) {
            logger.warn("Login failed. Invalid password for: {}", request.getEmail());
            throw new InvalidCredentialsException("Invalid Password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        logger.info("User logged in successfully: {}", request.getEmail());

        return new LoginResponse(token);
    }
}