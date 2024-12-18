package com.application.ecommerce.service;

import java.util.Collections;
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
		
		User user=userRepo.findByUsername(username);
		if(user!=null) {
			return builderUserDetails(user.getEmail(),user.getPassword(),"ROLE_USER");
		}
		
		Admin admin=adminRepo.findByAdminname(username);
		if(admin!=null) {
			return builderUserDetails(admin.getEmail(),admin.getPassword(),"ROLE_ADMIN");
		}
		
		throw new UsernameNotFoundException("Not found with username: "+username);
	}

	private UserDetails builderUserDetails(String email, String password,String role) {
		return org.springframework.security.core.userdetails.User.builder()
				.username(email)
				.password(password)
				.authorities(Collections.singletonList(new SimpleGrantedAuthority(role)))
				.build();
	}

}
