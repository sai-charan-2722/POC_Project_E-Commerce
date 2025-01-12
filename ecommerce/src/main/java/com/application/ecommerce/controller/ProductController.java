package com.application.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.application.ecommerce.model.Product;
import com.application.ecommerce.service.ProductService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class ProductController {
	
	@Autowired
	private ProductService productService;
	@GetMapping("/products/all")
	public List<Product> getAllProduct(){
		return productService.getAllProducts();
	}
}
