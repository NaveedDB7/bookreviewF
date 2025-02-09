if(req.session.authorization){
    let token=req.session.authorization['accesstoken'];

    jwt.verify(token,'access',(err,user)=>{
        if(!err){
            req.user=user;
            next();
        }
        else{
            return res.status(403).json({message:"user not authenticated"});
        }
    });
}
else{
    return res.status(403).json({message:"user not logged in"});
}
