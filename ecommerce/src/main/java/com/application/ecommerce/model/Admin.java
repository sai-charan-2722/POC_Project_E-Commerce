package com.application.ecommerce.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "admin")
public class Admin {
	@Id
	private String id;
	private String adminname;
	private String email;
	private String password;
	private Date dob;
		
}

