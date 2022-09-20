DROP TABLE IF EXISTS books;

CREATE TABLE books (
  id int PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(100) NOT NULL,
  cover VARCHAR(100) NOT NULL
);

insert into books(id, title, description, cover)
    values(1, 'xyz', 'This is a good book', 'https://img.freepik.com/free-psd/city-park-print-template_23-2148989478.jpg');

UPDATE books SET title = 'pqr', description = "Nice book", cover = "pqr" WHERE id=1;