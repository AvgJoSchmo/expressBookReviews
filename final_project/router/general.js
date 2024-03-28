const express = require('express');
const axios = require('axios');
const public_users = express.Router();
const booksdbAPI = 'http://localhost:3000';

// Task 10: Getting the list of books available in the shop
public_users.get('/', async function (_req, res) {
    try {
        const response = await axios.get(`${booksdbAPI}/books`);
        const bookList = response.data;
        if (bookList.length === 0) {
            return res.status(404).json({ error: "No books available" });
        }
        return res.status(200).json(bookList);
    } catch (error) {
        console.error("Error fetching books:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Task 11: Getting the book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    try {
        const response = await axios.get(`${booksdbAPI}/books/isbn/${isbn}`);
        const book = response.data;
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        return res.status(200).json(book);
    } catch (error) {
        console.error("Error fetching book details by ISBN:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Task 12: Getting the book details based on Author
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;
    try {
        const response = await axios.get(`${booksdbAPI}/books/author/${author}`);
        const matchedBooks = response.data;
        if (matchedBooks.length === 0) {
            return res.status(404).json({ error: "Books by author not found" });
        }
        return res.status(200).json(matchedBooks);
    } catch (error) {
        console.error("Error fetching book details by author:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Task 13: Getting the book details based on Title
public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;
    try {
        const response = await axios.get(`${booksdbAPI}/books/title/${title}`);
        const matchedBooks = response.data;
        if (matchedBooks.length === 0) {
            return res.status(404).json({ error: "Books by title not found" });
        }
        return res.status(200).json(matchedBooks);
    } catch (error) {
        console.error("Error fetching book details by title:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports.general = public_users;
