
-- SQL Schema for Waste Management System

CREATE TABLE bins (
    id SERIAL PRIMARY KEY,
    location VARCHAR(255),
    status VARCHAR(50), -- Empty, Half, Full
    last_cleared TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- You can insert sample data like:
-- INSERT INTO bins (location, status) VALUES ('Sector 10', 'Empty');
