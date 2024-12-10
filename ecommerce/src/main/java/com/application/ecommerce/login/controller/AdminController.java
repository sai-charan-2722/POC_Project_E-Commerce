package com.application.ecommerce.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.application.ecommerce.login.model.Admin;
import com.application.ecommerce.login.model.LoginRequest;
import com.application.ecommerce.login.service.AdminService;


@RestController
@RequestMapping("/api/admin")
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	@PostMapping("/register")
	public ResponseEntity<Admin> registerAdmin(@RequestBody Admin admin){
		Admin registeredAdmin=adminService.registerAdmin(admin);
		return ResponseEntity.ok(registeredAdmin);
	}
	

	@PostMapping("/login")
	public ResponseEntity<String> loginUser(@RequestBody LoginRequest loginRequest){
		String email=loginRequest.getEmail();
		String password=loginRequest.getPassword();
		Admin exsitingAdmin=adminService.loginAdmin(email,password);
		if(exsitingAdmin!=null) {
			return ResponseEntity.ok("Login successfull!");
		}
		else {
			return ResponseEntity.status(401).body("Invalid credentials");
		}
	}
}
