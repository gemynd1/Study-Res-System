package com.project.SnakeDev;

import com.project.SnakeDev.config.BigIntToIntegerTypeHandler;
import jakarta.servlet.http.HttpSessionEvent;
import jakarta.servlet.http.HttpSessionListener;
import org.mybatis.spring.boot.autoconfigure.ConfigurationCustomizer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.mybatis.spring.annotation.MapperScan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableScheduling
@MapperScan("com.project.SnakeDev.mapper")
public class SnakeDevApplication {
	public static void main(String[] args) {
		SpringApplication.run(SnakeDevApplication.class, args);
	}
	@Bean
	public HttpSessionListener httpSessionListener() {
		return new HttpSessionListener () {
			private final Logger log = LoggerFactory.getLogger(this.getClass());
			@Override
			public void sessionCreated(HttpSessionEvent se) {
				se.getSession().setMaxInactiveInterval(60 * 10); // 10분
				log.info("session");
			}

			@Override
			public void sessionDestroyed(HttpSessionEvent se) {
				log.info("session destroyed");
			}
		};
	}

//	@Bean
//	public ConfigurationCustomizer customizer() {
//		return configuration -> configuration.getTypeHandlerRegistry()
//				.register(Long.class, new BigIntToIntegerTypeHandler());
//	}

}
