package com.smarthire.auth.service;
import com.smarthire.auth.dto.LoginResponse;
import com.smarthire.auth.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.smarthire.auth.dto.RegisterRequest;
import com.smarthire.auth.entity.User;
import com.smarthire.auth.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.smarthire.auth.dto.LoginRequest;
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public String register(RegisterRequest request) {

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(
                        request.getPassword()))
                .role(request.getRole())
                .build();

        userRepository.save(user);

        return "User Registered Successfully";
    }
    public LoginResponse login(LoginRequest request) {

        User user =
                userRepository.findByEmail(
                        request.getEmail()
                ).orElse(null);

        if(user == null) {
            throw new RuntimeException(
                    "User Not Found"
            );
        }

        boolean matches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if(!matches) {
            throw new RuntimeException(
                    "Invalid Password"
            );
        }

        String token =
                jwtUtil.generateToken(
                        user.getEmail()
                );

        return new LoginResponse(token);
    }
}