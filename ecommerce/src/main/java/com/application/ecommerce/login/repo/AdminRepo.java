package com.application.ecommerce.login.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.application.ecommerce.login.model.Admin;




@Repository
public interface AdminRepo extends MongoRepository<Admin, String>{
	Admin findByEmail(String email);
}
