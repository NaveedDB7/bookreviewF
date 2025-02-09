regd_users.post("/login", (req,res) => {



    const username=req.body.username;
    const password=req.body.password;


    if(!username||!password){
        return res.status(404).json({message:"Error logging in"});
    }

    if(authenticatedUser(username,password)){

        let accessToken=jwt.sign({
            data: password
        },'access',{expiresIn:60*60});

        req.session.authorization={
            accessToken,username
        }

        return res.status(200).send('User successfully logged in');
    }
    else{
        return res.status(208).json({message:"invalid login"});
    }


 });