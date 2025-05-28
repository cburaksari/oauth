package com.example.security.controller;

import com.example.security.model.AuthRequest;
import com.example.security.model.AuthResponse;
import com.example.security.model.User;
import com.example.security.service.UserService;
import com.example.security.util.JwtUtil;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> userData) {
        String username = userData.get("username");
        String password = userData.get("password");

        if (username == null || password == null) {
            return ResponseEntity.badRequest().body("Username and password must be provided");
        }

        User savedUser = userService.saveUser(username, password);

        return ResponseEntity.ok("User registered successfully with id: " + savedUser.getId());
    }

    @GetMapping("/checkAuthentication")
    public ResponseEntity<?> currentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("Current user: " + authentication.isAuthenticated());

        if (authentication != null && authentication.isAuthenticated()
                && !(authentication instanceof AnonymousAuthenticationToken)) {
            return ResponseEntity.ok("Authenticated as " + authentication.getName());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not authenticated");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.username(), request.password()));
            UserDetails userDetails = userDetailsService.loadUserByUsername(request.username());
            String jwt = jwtUtil.generateToken(userDetails);
            return ResponseEntity.ok(new AuthResponse(jwt));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @GetMapping("/hello")
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hello, authenticated user!");
    }
}
