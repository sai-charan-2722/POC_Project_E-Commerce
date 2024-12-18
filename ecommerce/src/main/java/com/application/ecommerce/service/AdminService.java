package com.application.ecommerce.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.application.ecommerce.model.Admin;
import com.application.ecommerce.model.LoginRequest;
import com.application.ecommerce.model.Product;
import com.application.ecommerce.model.User;
import com.application.ecommerce.model.UserPrincipal;
import com.application.ecommerce.repo.AdminRepo;
import com.application.ecommerce.repo.ProductRepo;
import com.mongodb.client.model.ReturnDocument;


@Service("adminService")
public class AdminService{
	@Autowired
	private AdminRepo adminRepo;
	
	@Autowired
	private ProductRepo productRepo;
	
	@Autowired
	AuthenticationManager authManager;
	
	@Autowired
	private JWTService jwtService;
	
	private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder();
	
	public Admin registerAdmin(Admin admin) {
		if(adminRepo.findByAdminname(admin.getAdminname())!=null) {
			throw new RuntimeException("Error:Adminname already taken!");
		}
		if(adminRepo.findByEmail(admin.getEmail())!=null) {
			throw new RuntimeException("Error:Email is already in use!");
		}
		admin.setPassword(encoder.encode(admin.getPassword()));
		return adminRepo.save(admin);
	}
	
	public String verify(LoginRequest loginRequest) {
		Authentication authentication=
				authManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
		if(authentication.isAuthenticated()) {
			return jwtService.generateToken(loginRequest.getEmail());
		}
		return "fail";
	}
	
	public List<Product> searchProducts(String keyword){
		return productRepo.findByNameContainingIgnoreCase(keyword);
	}
	
	public Product addProduct(Product product) {
		return productRepo.save(product);
	}
	
	public Product updateProduct(String productId, Product updatedProduct) {
		Optional<Product> existingProduct= productRepo.findById(productId);
		if(existingProduct.isPresent()) {
			Product product=existingProduct.get();
			product.setPrice(updatedProduct.getPrice());
			return productRepo.save(product);
		}
		throw new RuntimeException("Product not found with id: "+productId);
	}
	
	public void removeProduct(String productId) {
		if(productRepo.existsById(productId)) {
			productRepo.deleteById(productId);
		}
		else {
			throw new RuntimeException("Product not found with id: "+productId);
		}
	}
}

