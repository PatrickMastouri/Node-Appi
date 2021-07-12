module.exports = app => {
    const forums = require("../controllers/forums.controller.js");
    var router = require("express").Router();
  
    router.post("/add",forums.createForum);
    router.get("/getAll",forums.getForum);
    router.get("/:id",forums.getForumById);
    router.get("/name/get/:subject",forums.getForumByContent);
    router.delete("/:id",forums.deleteForum);
    
    ///// test update
    router.patch("/update/:id",forums.updateForum);
    router.get("/tag/gettag/:tag",forums.getForumBytag);

  
    app.use('/api/forums', router);
  };