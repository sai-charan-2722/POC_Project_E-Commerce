package com.application.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.application.ecommerce.model.Product;
import com.application.ecommerce.repo.ProductRepo;

@Service
public class ProductService {
	
	@Autowired
	ProductRepo productRepo;
	
	public List<Product> getAllProducts() {
		return productRepo.findAll();
	}

	public List<Product> searchProducts(String keyword){
		return productRepo.findByTitleContainingIgnoreCase(keyword);
	}
}
