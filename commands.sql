CREATE TABLE blogs ( 
    id SERIAL PRIMARY KEY,
    author text, 
    url text NOT NULL, 
    title text NOT NULL, 
    likes integer DEFAULT 0 
);


INSERT INTO blogs (author, url, title, likes) VALUES
('John Doe', 'http://example.com/1', 'First Blog', 10),
('Jane Doe', 'http://example.com/2', 'Second Blog', 15);