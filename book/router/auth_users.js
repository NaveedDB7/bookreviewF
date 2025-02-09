const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
// code to check is the username is valid

 let userswithsamename=users.filter((user)=>{
        return user.username===username;
    });

    if(userswithsamename.length>0){
        return true;
    }
    else{
        return false;
    }
}


const authenticatedUser = (username,password)=>{ 
//code to check if username and password match the one we have in records.
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    // Return true if any valid user is found, otherwise false
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}


//only registered users can login
regd_users.post("/login", (req,res) => {
  const username=req.body.username;
    const password=req.body.password;

    if(username&&password){

        if(!isValid(username)){

            users.push({"username":username,"password":password});
            return res.status(200).json({message: "User successfully registered.You can Login Now"});
        }
        else{
            return res.status(404).json({message:"User already exists"});
        }
    }

    return res.status(404).json({message:"Unable to register user."});

});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn  = req.params.isbn;  // Get ISBN from the URL
    const {review} = req.query; // Get the review from query parameters
    const username = req.session.username;  // Get username from session

    if (!username) {
        return res.status(401).json({ message: "User not logged in." });  // Ensure the user is logged in
    }

    if (!review) {
        return res.status(400).json({ message: "Review text is required." });  // Ensure the review is not empty
    }

    // Check if the book exists
    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found." });  // Handle the case where the book does not exist
    }

    const book = books[isbn];
    
    // If the user already has a review for this ISBN, modify
    if (book.reviews[username]) {
        book.reviews[username] = review;  // Modify the existing review
        return res.status(200).json({ message: "Review updated successfully." });
    } else {
        // Otherwise, add new review
        book.reviews[username] = review;  // Add the review under the username
        return res.status(201).json({ message: "Review added successfully." });
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
