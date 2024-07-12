-- Enable foreign key checks (optional for MySQL, but good practice)
SET FOREIGN_KEY_CHECKS = ON;

-- Create the `users` table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY, -- Use INT since you'll be manually assigning IDs
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255) NOT NULL -- Store hashed passwords
);

-- Insert initial users (replace placeholders with actual values)
INSERT INTO users (id, username, email, password) VALUES 
    (67, 'Rodrigo Lisita Ribera', 'amma.rodrigo@gmail.com', 'teste');
    
    
