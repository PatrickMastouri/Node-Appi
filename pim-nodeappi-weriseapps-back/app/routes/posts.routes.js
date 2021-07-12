module.exports = app => {
    const posts = require("../controllers/posts.controller.js");
    var router = require("express").Router();
  
    router.post("/addPost",posts.createPosts);
    router.get("/GetAll",posts.getPosts);
    router.get("/:id",posts.getPostsById);
    router.get("/name/get/:tags",posts.getPostsByContent);
    router.delete("/:id",posts.deletePosts); 
    
    
//////////////////// elli ne9es
    router.get("/forum/:forumId",posts.getPostsByForumId);
    router.patch("/update/:id",posts.updatePost);



  
    app.use('/api/posts', router);
  };