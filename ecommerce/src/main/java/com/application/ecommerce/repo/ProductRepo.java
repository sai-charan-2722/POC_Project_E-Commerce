package com.application.ecommerce.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.application.ecommerce.model.Product;

@Repository
public interface ProductRepo extends MongoRepository<Product, String>{

	List<Product> findByNameContainingIgnoreCase(String keyword);

	
}
