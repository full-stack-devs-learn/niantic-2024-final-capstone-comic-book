package com.niantic;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class CapstoneApplication
{

    public static void main(String[] args) {
        SpringApplication.run(CapstoneApplication.class, args);
    }

}
