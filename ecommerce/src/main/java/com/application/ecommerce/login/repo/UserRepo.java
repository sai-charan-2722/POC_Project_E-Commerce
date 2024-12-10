package com.application.ecommerce.login.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.application.ecommerce.login.model.User;

@Repository
public interface UserRepo extends MongoRepository<User, String>{
	User findByEmail(String email);
}
