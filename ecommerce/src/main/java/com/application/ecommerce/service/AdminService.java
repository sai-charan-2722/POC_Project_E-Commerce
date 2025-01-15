package com.application.ecommerce.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.application.ecommerce.model.Admin;
import com.application.ecommerce.model.LoginRequest;
import com.application.ecommerce.model.LoginResponse;
import com.application.ecommerce.model.Product;
import com.application.ecommerce.model.RegisterResponse;
import com.application.ecommerce.repo.AdminRepo;
import com.application.ecommerce.repo.ProductRepo;

@Service("adminService")
public class AdminService{
	@Autowired
	private AdminRepo adminRepo;
	
	@Autowired
	private ProductRepo productRepo;

	@Autowired
	private JWTService jwtService;
	
	private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder();
	
	public RegisterResponse registerAdmin(Admin admin) {
		if(adminRepo.findByAdminname(admin.getAdminname())!=null) {
			return new RegisterResponse(null,"Adminname already taken!");
		}
		if(adminRepo.findByEmail(admin.getEmail())!=null) {
			return new RegisterResponse(null,"Email is already in use!");
		}
		admin.setPassword(encoder.encode(admin.getPassword()));
		adminRepo.save(admin);
		return new RegisterResponse(admin,"Registeration Successfull");
	}
	
	public LoginResponse verify(LoginRequest loginRequest) {
			Admin admin=adminRepo.findByEmail(loginRequest.getEmail());
			String token=jwtService.generateToken(loginRequest.getEmail());
				if(admin==null) {
					return new LoginResponse(null,"Email not found",null);
				}
				boolean isPasswordMatch=encoder.matches(loginRequest.getPassword(), admin.getPassword());
				if(!isPasswordMatch) {
					return new LoginResponse(null,"Incorrect Password",null);
				}
			return new LoginResponse(admin,"Login successfull", token);
	}
	
	public List<Product> searchProducts(String keyword){
		return productRepo.findByTitleContainingIgnoreCase(keyword);
	}
	
	public Product addProduct(Product product) {
		return productRepo.save(product);
	}
	
	public Product updateProduct(String productId, Product updatedProduct) {
		Optional<Product> existingProduct= productRepo.findById(productId);
		if(existingProduct.isPresent()) {
			Product product=existingProduct.get();
			product.setTitle(updatedProduct.getTitle());
			product.setDescription(updatedProduct.getDescription());
			product.setPrice(updatedProduct.getPrice());
			return productRepo.save(product);
		}
		throw new RuntimeException("Product not found with id: "+productId);
	}
	
	public Optional<Product> removeProduct(String productId) {
		if(productRepo.existsById(productId)) {
			Optional<Product> deletedProduct= productRepo.findById(productId);
			productRepo.deleteById(productId);
			return deletedProduct;
		}
		else {
			throw new RuntimeException("Product not found with id: "+productId);
		}
	}

	public List<Product> getAllProducts() {
		return productRepo.findAll();
	}
}

