package com.application.ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.application.ecommerce.repo.ProductRepo;
import com.application.ecommerce.repo.UserRepo;
import com.application.ecommerce.model.Admin;
import com.application.ecommerce.model.LoginRequest;
import com.application.ecommerce.model.User;
import com.application.ecommerce.model.UserPrincipal;

@Service("userService")
public class UserService{
	@Autowired
	private UserRepo userRepo;

	@Autowired
	private ProductRepo productRepo;
	
	@Autowired
	AuthenticationManager authManager;
	
	@Autowired
	private JWTService jwtService;
	
	private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder();
	
	public User registerUser(User user) {
		if(userRepo.findByUsername(user.getUsername())!=null) {
			throw new RuntimeException("Error:Username already taken!");
		}
		if(userRepo.findByEmail(user.getEmail())!=null) {
			throw new RuntimeException("Error:Email is already in use!");
		}
		user.setPassword(encoder.encode(user.getPassword()));
		return userRepo.save(user);
	}
	
	public String verify(LoginRequest loginRequest) {
		Authentication authentication=
				authManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
		if(authentication.isAuthenticated()) {
			return jwtService.generateToken(loginRequest.getEmail());
		}
		return "fail";
	}
	
	
}
