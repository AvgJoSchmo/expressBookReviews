const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (_username) => {
    //write code to check if the username is valid
}

const authenticatedUser = (_username, _password) => {
    //write code to check if username and password match the one we have in records.
}

// Task 7: Complete the code for logging in as a registered user
// The code must validate and sign in a customer based on the username and password.
// It must also save the user credentials for the session as a JWT.
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }
    if (!authenticatedUser(username, password)) {
        return res.status(401).json({ error: "Invalid username or password" });
    }
    // Assuming the user is authenticated, generate and sign a JWT token
    const token = jwt.sign({ username }, "secret_key", { expiresIn: "1h" });
    // Return the token as response
    return res.status(200).json({ token });
});

// Task 8: Complete the code for adding or modifying a book review
// You have to give a review as a request query & it must get posted with the username (stored in the session) posted.
// If the same user posts a different review on the same ISBN, it should modify the existing review.
// If another user logs in and posts a review on the same ISBN, it will get added as a different review under the same ISBN.
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.query.review;
    const username = req.session.user.username;
    addOrModifyReview(isbn, username, review);
    res.send("Review added/modified successfully");
});

// Task 9: Complete the code for deleting a book review
// Filter & delete the reviews based on the session username, so that a user can delete only his/her reviews and not other users’.
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.user.username; 
    deleteReview(isbn, username);
    res.send("Review deleted successfully");
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
