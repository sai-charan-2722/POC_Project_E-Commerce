package com.application.ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.application.ecommerce.repo.UserRepo;
import com.application.ecommerce.model.LoginRequest;
import com.application.ecommerce.model.LoginResponse;
import com.application.ecommerce.model.RegisterResponse;
import com.application.ecommerce.model.User;

@Service("userService")
public class UserService{
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private JWTService jwtService;
	
	private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder();
	
	public RegisterResponse registerUser(User user) {
		if(userRepo.findByUsername(user.getUsername())!=null) {
			return new RegisterResponse(null,"Username already taken!");
		}
		if(userRepo.findByEmail(user.getEmail())!=null) {
			return new RegisterResponse(null,"Email is already in use!");
		}
		user.setPassword(encoder.encode(user.getPassword()));
		userRepo.save(user);
		return new RegisterResponse(user,"Registeration Successfull");
	}
	
	public LoginResponse verify(LoginRequest loginRequest) {
			User user=userRepo.findByEmail(loginRequest.getEmail());
			String token=jwtService.generateToken(loginRequest.getEmail());
				if(user==null) {
					return new LoginResponse(null,"Email not found",null);
				}
				boolean isPasswordMatch=encoder.matches(loginRequest.getPassword(), user.getPassword());
				if(!isPasswordMatch) {
					return new LoginResponse(null,"Incorrect password",null);
				}
			return new LoginResponse(user,"Login successfull", token);
		
	}
	
	
}
