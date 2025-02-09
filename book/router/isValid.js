const isValid=(username)=>{

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