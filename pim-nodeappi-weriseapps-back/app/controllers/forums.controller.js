const db = require("../models");
const Forum = db.forums;


exports.createForum = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a User
    const forum = new Forum({
        subject:           req.body.subject,
        description:       req.body.description,
        tag:               req.body.tag,
        interested:        req.body.interested,
        UserId:            req.body.UserId,
      
    });

    
    // Save User in the database
    forum
      .save(forum)
      .then(data => {
        if(!data){
            return res.json({
                succes: 0,
                message: "Failed to create forum"
            });
        }
        else{
            res.json({
                succes: 1,
                message: "forum created"
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
exports.getForum = (req, res) => {
    Forum.find().then(data => {
    if (!data)
        res.json({
            succes: 0,
            message: "forum not found"
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
exports.getForumById = (req, res) => {
    const id = req.params.id;

    Forum.findById(id)
        .then(data => {
        if (!data)
            res.json({
                succes: 0,
                message: "forum not found"
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

//////////////////////////////////////////////////////delete project
exports.deleteForum = (req, res) => {
  const id = req.params.id;

  Forum.findByIdAndRemove(id).then(data => {
    if (!data)
        res.json({
            succeded: 0,
            message: "forum not found"
        })
    else
        res.json({
            succeded: 1,
            message: "forum deleted succefully"
        })
    })
    .catch(err => {
        console.log(err);
        return ;
    });
};
 
//// testUpdte
exports.updateForum = (req, res) => {
    const id = req.params.id;
    const postData = req.body;
    const forum =  Forum.findById(id);

    // copy userParam properties to user
    //Object.assign(forum, postData);

    forum.replaceOne({_id: id},postData)
     .then(data => {
        if(!data){
            return res.json({
                succes: 0,
                message: "Failed to update forum"
            });
        }
        else{
            res.json({
                succes: 1,
                message: "forum updated"
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




    
 exports.getForumBytag = (req, res) => {
        const tag = req.params.tag;
      
        Forum.find({ tag : tag }).then(data => {
          if (!data)
              res.json({
                  succes: 0,
                  message: "forum not found"
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



exports.getForumByContent = (req, res) => {
        const subject = req.params.subject;
      
        Forum.find({ subject : subject }).then(data => {
          if (!data)
              res.json({
                  succes: 0,
                  message: "forum not found"
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
      