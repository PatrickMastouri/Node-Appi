module.exports = app => {
    const users = require("../controllers/users.controller.js");
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", users.create);
    router.get("/:id", users.findOne);
    router.get("/",users.getUsers);
    router.get("/mail/get/:mail",users.getUserByUserMail);
    router.delete("/",users.deleteUsers);
    router.post("/login",users.login);
    router.post("/forgetpasswordconfirmation/",users.sendPasswordCode); // send mail with code for forget password
    
    router.patch("/",users.updateUsers);                                  // update user
    router.patch("/forgetpasswordchange/",users.passwordChange);          //ybadel el password


    /*
    router.get("/confirmation/:token/:email",users.confirmations)         // ki ienzel 3al mail mta3 el confirmation
    router.patch("/",users.updateUsers);                                  // update user
    router.patch("/forgetpasswordchange/",users.passwordChange);          //ybadel el password
    */   

  
    app.use('/api/users', router);
  };