const db = require("../models");
const Posts = db.posts;
const User = db.users;

exports.createPosts = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a User
    const post = new Posts({
        title:      req.body.title,
        content:    req.body.content,
        tags:      req.body.tags,
        likes:      req.body.likes,
        forumId:    req.body.forumId,
        UserId:     req.body.UserId,
      
    });

    
    // Save User in the database
    post
      .save(post)
      .then(data => {
        if(!data){
            return res.json({
                succes: 0,
                message: "Failed to create posts"
            });
        }
        else{
            res.json({
                succes: 1,
                message: "posts created"
            })
        }
      })
      .catch(err => {
        res.json({
            succes: 0,
            message: err
        });
      });

};

//////////////////////////////////////////////////////Get Projects
exports.getPosts = (req, res) => {
    Posts.find().then(data => {
    if (!data)
        res.json({
            succes: 0,
            message: "posts not found"
        })
    else
        res.json({
            succes: 1,
            data: data
        })
    })
    .catch(err => {
        res.json({
            succes: 0,
            message: err
        })
    });
};

//////////////////////////////////////////////////////Get Projects by projectid
exports.getPostsById = (req, res) => {
    const id = req.params.id;

    Posts.findById(id)
        .then(data => {
        if (!data)
            res.json({
                succes: 0,
                message: "posts not found"
            })
        else
            res.json({
                succes: 1,
                data: data
            })
        })
        .catch(err => {
            res.json({
                succes: 0,
                message: err
            })
        });
};




//////////////////////////////////////////////////////Get Projects by projectid
exports.getPostsByForumId = (req, res) => {
    const forumId = req.params.forumId;

    Posts.find({forumId: forumId})
        .then(data => {
        if (!data)
            res.json({
                succes: 0,
                message: "posts not found"
            })
        else
            res.json({
                succes: 1,
                data: data
            })
        })
        .catch(err => {
            res.json({
                succes: 0,
                message: err
            })
        });
};





//////////////////////////////////////////////////////Get Projects by projectname
exports.getPostsByContent = (req, res) => {
    const tags = req.params.tags;

    Posts.find({ tags : tags }).then(data => {
      if (!data)
          res.json({
              succes: 0,
              message: "posts not found"
          })
      else
          res.json({
              succes: 1,
              data: data
          })
      })
      .catch(err => {
          console.log(err);
          return ;
      });
};

//////////////////////////////////////////////////////delete project
exports.deletePosts = (req, res) => {
  const id = req.params.id;

  Posts.findByIdAndRemove(id).then(data => {
    if (!data)
        res.json({
            succeded: 0,
            message: "posts not found"
        })
    else
        res.json({
            succeded: 1,
            message: "posts deleted succefully"
        })
    })
    .catch(err => {
        console.log(err);
        return ;
    });
};
 

//// testUpdte
exports.updatePost = (req, res) => {
    const id = req.params.id;
    const postData = req.body;
    const post =  Posts.findById(id);

    // copy userParam properties to user
    //Object.assign(forum, postData);

    post.replaceOne({_id: id},postData)
     .then(data => {
        if(!data){
            return res.json({
                succes: 0,
                message: "Failed to update Post"
            });
        }
        else{
            res.json({
                succes: 1,
                message: "Post updated"
            })
        }
      })
      .catch(err => {
        res.json({
            succes: 0,
            message: err
        });
      });

    }

    exports.getPostsByForumId = (req, res) => {
    const forumId = req.params.forumId;
    
    Posts.find({forumId: forumId}).then(async data => {
        
          
        const promises = data.map(async (post) => {
         const user = await User.findOne({_id:post.UserId})
          
            const newPost = {...post._doc,user:user}

          return newPost
        })
      
        const numFruits = await Promise.all(promises)
        
      
       return numFruits
      

})
        .then(data => {
        if (!data)
            res.json({
                succes: 0,
                message: "posts not found"
            })
        else
            res.json({
                succes: 1,
                data: data
            })
        })
        .catch(err => {
            res.json({
                succes: 0,
                message: err
            })
        });
};

