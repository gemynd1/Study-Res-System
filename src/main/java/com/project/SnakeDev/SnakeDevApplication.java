package com.project.SnakeDev;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.project.SnakeDev.mapper")
public class SnakeDevApplication {

	public static void main(String[] args) {
		SpringApplication.run(SnakeDevApplication.class, args);
	}

}
