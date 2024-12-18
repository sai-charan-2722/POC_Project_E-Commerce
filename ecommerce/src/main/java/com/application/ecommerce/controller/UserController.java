package com.application.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.application.ecommerce.service.UserService;
import com.application.ecommerce.model.LoginRequest;
import com.application.ecommerce.model.User;



@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/users")
public class UserController {
	@Autowired
	private UserService userService;
	
	@PostMapping("/register")
	public User registerUser(@RequestBody User user) {
		return userService.registerUser(user);
	}

	@PostMapping("/login")
	public String loginUser(@RequestBody LoginRequest loginRequest){
		return userService.verify(loginRequest);
	}
}	
