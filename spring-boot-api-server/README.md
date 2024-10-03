# Spring Boot API

This API project is the backend for your capstone project.

## Database

The script to create the database is located at `database/create_database.sql`.

The script includes just the users table with several users. The password for all users is `password`.
You can add or remove users as needed - they are just used as placeholders for the starter code.

You should update this script as you design your database to include any new tables, and add seed data.

If you decide to change the name of the database you must update the connection string in the
`src/main/resources/application.properties` file

## Controllers

The `AuthenticationController` is provided for you to allow users to register and login.

The `DemoController` is intended to be a reference guide to demonstrate the `@PreAuthorize` annotation.