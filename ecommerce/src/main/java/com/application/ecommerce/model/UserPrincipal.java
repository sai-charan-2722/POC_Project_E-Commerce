package com.application.ecommerce.model;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


public class UserPrincipal implements UserDetails{
	private String email;
	private String password;
	private Collection<? extends GrantedAuthority> authorities;
	public UserPrincipal(Admin admin) {
		this.email = admin.getEmail();
		this.password = admin.getPassword();
		this.authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN"));
	}
	public UserPrincipal(User user) {
		this.email = user.getEmail();
		this.password = user.getPassword();
		this.authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}
	@Override
	public String getPassword() {
		return password;
	}
	@Override
	public String getUsername() {
		return email;
	}
	
	
}

