

regd_users.put('/auth/review/:isbn', function (req, res) {
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
    
    // If the user already has a review for this ISBN, modify it
    if (book.reviews[username]) {
        book.reviews[username] = review;  // Modify the existing review
        return res.status(200).json({ message: "Review updated successfully." });
    } else {
        // Otherwise, add the new review
        book.reviews[username] = review;  // Add the review under the username
        return res.status(201).json({ message: "Review added successfully." });
    }
});
