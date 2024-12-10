package com.application.ecommerce.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.application.ecommerce.login.model.LoginRequest;
import com.application.ecommerce.login.model.User;
import com.application.ecommerce.login.service.UserService;



@RestController
@RequestMapping("/api/users")
public class UserController {
	@Autowired
	private UserService userService;
	
	@PostMapping("/register")
	public ResponseEntity<User> registerUser(@RequestBody User user){
		User registeredUser=userService.registerUser(user);
		return ResponseEntity.ok(registeredUser);
	}
	
	@PostMapping("/login")
	public ResponseEntity<String> loginUser(@RequestBody LoginRequest loginRequest){
		String email=loginRequest.getEmail();
		String password=loginRequest.getPassword();
		User exsitingUser=userService.loginUser(email,password);
		if(exsitingUser!=null) {
			return ResponseEntity.ok("Login successfull!");
		}
		else {
			return ResponseEntity.status(401).body("Invalid credentials");
		}
	}
}
