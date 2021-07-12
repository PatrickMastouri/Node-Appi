module.exports = app => {
    const comments = require("../controllers/comments.controller");
    var router = require("express").Router();
  
    router.post("/addComment",comments.createComments);
    router.get("/",comments.getComments);
    router.get("/:id",comments.getCommentsById);
    router.get("/name/get",comments.getCommentsByContent);
    router.delete("/:id",comments.deletComments);  
    
    
    ////////////////////elli zayd
    router.get("/posts/:PostId",comments.getPostsByPostId);
    router.get("/getNumber/:PostId",comments.calculate)



  
    app.use('/api/comments', router);
  };