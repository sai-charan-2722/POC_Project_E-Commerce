package com.application.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.application.ecommerce.model.Admin;
import com.application.ecommerce.model.User;
import com.application.ecommerce.repo.AdminRepo;
import com.application.ecommerce.repo.UserRepo;

@Service
public class MyAdminDetailsService implements UserDetailsService{

	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private AdminRepo adminRepo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user=userRepo.findByEmail(username);
		if(user!=null) {
			return new org.springframework.security.core.userdetails.User(
					user.getEmail(), 
					user.getPassword(),
					List.of(new SimpleGrantedAuthority("ROLE_USER")));
		}
		
		Admin admin=adminRepo.findByEmail(username);
		if(admin!=null) {
			return new org.springframework.security.core.userdetails.User(
					admin.getEmail(), 
					admin.getPassword(),
					List.of(new SimpleGrantedAuthority("ROLE_ADMIN")));
		}
		
		throw new UsernameNotFoundException("Not found with username: "+username);
	}


}
