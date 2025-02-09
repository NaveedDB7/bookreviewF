public_users.get('/isbn/:isbn',function (req, res) {

    const isbn=req.params.isbn;
    res.send(books[isbn]);

});

public_users.get('/author/:author',function(req,res){

    const author=req.params.author;
    res.send(books[author]);
});

public_users.get('/title/:title',function(req,res){
    const title=req.params.title;
    res.send(books[title]);


});

public_users.get('/review/:isbn',function(req,res){

    const isbn=req.params.isbn;
    const book=books[isbn];

    if(book){

        if(Object.keys(book.reviews).length>0){
            res.status(200({reviews:book.reviews}));
        }
        else{
            res.status(404).json({message: "Book not found."});
        }
    }
});

