package com.application.ecommerce.login.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.application.ecommerce.login.model.User;
import com.application.ecommerce.login.repo.UserRepo;

@Service
public class UserService {
	@Autowired
	private UserRepo userRepo;
	
	public User registerUser(User user) {
		return userRepo.save(user);
	}
	
	public User loginUser(String email, String password) {
		User user=userRepo.findByEmail(email);
		if(user!=null && user.getPassword().equals(password)) {
			return user;
		}
		return null;
	}
}
