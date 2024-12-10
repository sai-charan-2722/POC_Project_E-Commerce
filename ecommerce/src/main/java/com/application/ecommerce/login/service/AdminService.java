package com.application.ecommerce.login.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.application.ecommerce.login.model.Admin;
import com.application.ecommerce.login.repo.AdminRepo;


@Service
public class AdminService {
	@Autowired
	private AdminRepo adminRepo;
	
	public Admin registerAdmin(Admin admin) {
		return adminRepo.save(admin);
	}
	
	public Admin loginAdmin(String email, String password) {
		Admin admin=adminRepo.findByEmail(email);
		if(admin!=null && admin.getPassword().equals(password)) {
			return admin;
		}
		return null;
	}
}

