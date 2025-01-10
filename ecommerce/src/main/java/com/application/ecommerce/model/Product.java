package com.application.ecommerce.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Document(collection = "products")
public class Product {
	
	@Id
	private String id;
	private String title;
	private String description;
	private double price;
	private String image;

}
