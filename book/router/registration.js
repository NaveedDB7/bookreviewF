public_users.post("/register",(req,res)=>{

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

