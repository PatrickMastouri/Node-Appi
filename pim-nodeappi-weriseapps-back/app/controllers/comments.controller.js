const db = require("../models");
const Comments = db.comments;
const User = db.users;


exports.createComments = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a User
    const commnts = new Comments({
    
        content:    req.body.content,
        PostId:          req.body.PostId,
        UserId:     req.body.UserId,
      
    });

    
    // Save User in the database
    commnts
      .save(commnts)
      .then(data => {
        if(!data){
            return res.json({
                succes: 0,
                message: "Failed to create commnts"
            });
        }
        else{
            res.json({
                succes: 1,
                message: "forum commnts"
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
exports.getComments = (req, res) => {
    Comments.find().then(data => {
    if (!data)
        res.json({
            succes: 0,
            message: "commnts not found"
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
exports.getCommentsById = (req, res) => {
    const id = req.params.id;

    Comments.findById(id)
        .then(data => {
        if (!data)
            res.json({
                succes: 0,
                message: "commnts not found"
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



//////////////////////////////////////////////////////elli zyd
exports.getPostsByPostId = (req, res) => {
    const PostId = req.params.PostId;

    Comments.find({PostId: PostId}).then(async data => {
        
          
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
                message: "commnts not found"
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
exports.getCommentsByContent = (req, res) => {
  const subject = req.body.subject;

  Comments.findOne({ subject : subject }).then(data => {
    if (!data)
        res.json({
            succes: 0,
            message: "commnts not found"
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
exports.deletComments = (req, res) => {
  const id = req.params.id;

  Comments.findByIdAndRemove(id).then(data => {
    if (!data)
        res.json({
            succeded: 0,
            message: "commnts not found"
        })
    else
        res.json({
            succeded: 1,
            message: "commnts deleted succefully"
        })
    })
    .catch(err => {
        console.log(err);
        return ;
    });
};
 


exports.calculate = (req, res) => {
    const PostId = req.params.PostId;

    Comments.find({PostId: PostId})
        .then(data => {
        if (!data)
            res.json({
                succes: 0,
                message: "commnts not found"
            })
        else
            Comments.count({PostId: PostId}).then(data=>{
                res.json({
                    succes: 1,
                    data: data
                })

            })
        })
        .catch(err => {
            res.json({
                succes: 0,
                message: err
            })
        });
};
