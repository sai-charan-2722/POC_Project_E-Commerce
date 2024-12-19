package com.application.ecommerce.controller;

import java.util.List;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.application.ecommerce.model.Admin;
import com.application.ecommerce.service.AdminService;
import com.application.ecommerce.model.LoginRequest;
import com.application.ecommerce.model.LoginResponse;
import com.application.ecommerce.model.Product;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/admin")
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	@PostMapping("/register")
	public Admin registerAdmin(@RequestBody Admin admin) {
		return adminService.registerAdmin(admin);
	}

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> loginAdmin(@RequestBody LoginRequest loginRequest){
		LoginResponse loginResponse=adminService.verify(loginRequest);
		return ResponseEntity.ok(loginResponse);
	}
	
	@GetMapping("/products/find")
	public List<Product> searchProducts(@RequestParam String keyword){
		return adminService.searchProducts(keyword);
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
	public String removeProduct(@PathVariable String id) {
		adminService.removeProduct(id);
		return "Product with id "+id+" removed successfully."; 
	}
}
