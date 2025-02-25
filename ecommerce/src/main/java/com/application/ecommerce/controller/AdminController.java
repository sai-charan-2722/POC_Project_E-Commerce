package com.application.ecommerce.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.application.ecommerce.model.Admin;
import com.application.ecommerce.service.AdminService;
import com.application.ecommerce.model.LoginRequest;
import com.application.ecommerce.model.LoginResponse;
import com.application.ecommerce.model.Product;
import com.application.ecommerce.model.RegisterResponse;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/admin")
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	@GetMapping("/products/all")
	public List<Product> getAllProduct(){
		return adminService.getAllProducts();
	}
	
	@PostMapping("/register")
	public ResponseEntity<RegisterResponse> registerAdmin(@RequestBody Admin admin) {
		RegisterResponse registerResponse= adminService.registerAdmin(admin);
		return ResponseEntity.ok(registerResponse);
	}

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> loginAdmin(@RequestBody LoginRequest loginRequest){
		LoginResponse loginResponse=adminService.verify(loginRequest);
		return ResponseEntity.ok(loginResponse);
	}
	
	@PostMapping("/products/add")
	public Product addProduct(@RequestBody Product product) {
		return adminService.addProduct(product);
	}
	
	@PutMapping("/products/update/{id}")
	public Product updateProduct(@PathVariable String id, @RequestBody Product product) {
		return adminService.updateProduct(id, product);
	}
	
	@DeleteMapping("/products/remove/{id}")
	public Optional<Product> removeProduct(@PathVariable String id) {
		return adminService.removeProduct(id);
	}
	
	
}
