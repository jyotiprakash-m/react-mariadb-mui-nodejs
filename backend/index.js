var express = require('express')
var cors = require('cors')
var app = express()
const mariadb = require("mariadb");
app.use(cors());
app.use(express.json());

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: "test",
    connectionLimit: 5
});

app.get("/", (req, res) => {
    res.json("hello");
});

// Create the table
app.get("/createTable", async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query("DROP TABLE IF EXISTS books");

        const result = await conn.query(`CREATE TABLE books (
            id int PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            description VARCHAR(100) NOT NULL,
            cover VARCHAR(100) NULL
          )`);
        console.log(result)
        res.json({ status: "Table created" });

    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release(); //release to pool
    }
})
// Add book
app.post("/book", async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const book = await conn.query("SELECT * from books WHERE id=?", [req.body.id]);
        if (book[0]) {
            res.status(400).json({ status: "Duplicate book id" });
        } else {
            const query = await conn.query("insert into books(id, title, description, cover) values( ?, ?, ?, ?)", [req.body.id, req.body.title, req.body.description, req.body.cover]);
            res.json({ status: "Book is added" });
        }

    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release(); //release to pool
    }
})
// Update by book
app.put("/book", async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const book = await conn.query("SELECT * from books WHERE id=?", [req.body.id]);
        if (book[0]) {
            await conn.query("UPDATE books SET title = ?, description = ?, cover = ? WHERE id= ?", [req.body.title, req.body.description, req.body.cover === undefined ? null : req.body.cover, req.body.id,]);
            res.json({ status: "Book is updated" });
        } else {
            res.json({ status: "Book is not found" });
        }

    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release(); //release to pool
    }
})
// Delete book
app.delete('/book/:id', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const book = await conn.query("SELECT * from books WHERE id=?", [req.params.id]);
        if (book[0]) {
            await conn.query("DELETE FROM books WHERE id = ?", [req.params.id]);
            res.json({ status: "Book is deleted" });
        } else {
            res.json({ status: "Book is not found" });
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ status: err.text })
        throw err;
    } finally {
        if (conn) conn.release(); //release to pool
    }
});
// Get all
app.get("/book", async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query("SELECT * from books");
        res.json(result);

    } catch (err) {
        res.status(400).json({ status: err.text })
        throw err;
    } finally {
        if (conn) conn.release(); //release to pool
    }
})
// Get by id
app.get("/book/:id", async (req, res) => {

    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query("SELECT * from books WHERE id=?", [req.params.id]);
        if (result.length === 1) {
            res.json(result[0]);
        } else {
            res.status(400).json({ status: "No data found" })
        }

    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release(); //release to pool
    }
})
// Get by title
app.get("/getBookByTitle", async (req, res) => {
    // const title = req.query.title;

    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query("SELECT * from books WHERE title=?", [req.query.title]);
        res.json(result);


    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release(); //release to pool
    }

})
// Get by title like
app.get("/getBookByTitleLike", async (req, res) => {
    const title = req.query.title;
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(`SELECT * from books WHERE title LIKE '%${title}%'`);
        res.json(result);
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release(); //release to pool
    }
})


app.listen(8800, () => {
    console.log("Connected to backend.");
});