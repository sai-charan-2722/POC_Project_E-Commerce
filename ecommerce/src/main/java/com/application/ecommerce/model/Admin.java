package com.application.ecommerce.model;

import java.util.Date;

import org.apache.logging.log4j.message.Message;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

