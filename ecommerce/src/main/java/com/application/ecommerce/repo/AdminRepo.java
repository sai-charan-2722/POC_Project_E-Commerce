package com.application.ecommerce.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.application.ecommerce.model.Admin;




@Repository
public interface AdminRepo extends MongoRepository<Admin, String>{
	Admin findByEmail(String email);
	boolean existsByEmail(String email);
	Admin findByAdminname(String adminname);
}
