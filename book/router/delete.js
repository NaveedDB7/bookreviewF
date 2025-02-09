regd_users.delete("/auth/review/:isbn", (req, res) => {
    const { isbn } = req.params;  // Get the ISBN from the URL parameter
    const username = req.session.username;  // Get the username from session

    // Ensure the user is logged in
    if (!username) {
        return res.status(401).json({ message: "User not logged in." });
    }

    // Check if the book exists
    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found." });
    }

    const book = books[isbn];

    // Check if the user has a review for this book
    if (!book.reviews[username]) {
        return res.status(404).json({ message: "Review not found for this user." });
    }

    // Delete the review for the current user
    delete book.reviews[username];

    // Send success message
    return res.status(200).json({ message: "Review deleted successfully." });
});
