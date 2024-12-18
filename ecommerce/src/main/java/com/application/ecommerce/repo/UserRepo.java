package com.application.ecommerce.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.application.ecommerce.model.User;

@Repository
public interface UserRepo extends MongoRepository<User, String>{
	User findByEmail(String email);
	boolean existsByEmail(String email);
	User findByUsername(String username);
}
