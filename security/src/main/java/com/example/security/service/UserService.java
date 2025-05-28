package com.example.security.service;

import com.example.security.model.User;
import com.example.security.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public User saveUser(String username, String rawPassword) {
    User user = new User();
    user.setUsername(username);
    user.setPassword(passwordEncoder.encode(rawPassword));
    return userRepository.save(user);
  }
}
