const db = require("../models");
const Reclamation = db.reclamation;
const nodemailer = require("nodemailer");
const User = db.users;



async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'nodeappigroup@gmail.com', // generated ethereal user
        pass:'nodeappi123', // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'nodeappigroup@gmail.com', // sender address
      to: 'rafik.mastouri@esprit.tn', // list of receivers
      subject: "Confermaition of your claim ✔", // Subject line
      text: "congratulations your claim have been accepted successfully :)", // plain text body
      html: "<b>congratulations your claim have been accepted successfully :)</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  


exports.createRec = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a User
    const reclamation = new Reclamation({
        subject:           req.body.subject,
        description:       req.body.description,
        etat:              req.body.etat,
        UserId:            req.body.UserId,
      
    });

    
    // Save User in the database
    reclamation
      .save(reclamation)
      .then(data => {
        if(!data){
            return res.json({
                succes: 0,
                message: "Failed to create Reclamation"
            });
        }
        else{
            res.json(data)
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
exports.getRec = (req, res) => {
    Reclamation.find().then(async data => {
        
          
        const promises = data.map(async (post) => {
         const user = await User.findOne({_id:post.UserId})
          
            const newPost = {...post._doc,user:user}

          return newPost
        })
      
        const numFruits = await Promise.all(promises)
        
      
       return numFruits
      

}).then(data => {
    if (!data)
        res.json({
            succes: 0,
            message: "Reclamation not found"
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

//////////////////////////////////////////////////////Get Reclamation by ReclamationID
exports.getRecById = (req, res) => {
    const id = req.params.id;

    Reclamation.findById(id)
        .then(data => {
        if (!data)
            res.json({
                succes: 0,
                message: "Reclamation not found"
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



//////////////////////////////////////////////////////delete project
exports.deleteRec = (req, res) => {
  const id = req.params.id;

  Reclamation.findByIdAndRemove(id).then(data => {
    if (!data)
        res.json({
            succeded: 0,
            message: "Reclamation not found"
        })
    else
        res.json({
            succeded: 1,
            message: "Reclamation deleted succefully"
        })
    })
    .catch(err => {
        console.log(err);
        return ;
    });
};
 
//// testUpdte
exports.updateRec = (req, res) => {
    const id = req.params.id;
    const postData = req.body;
    const reclamation =  Reclamation.findById(id);

    // copy userParam properties to user
    //Object.assign(forum, postData);

    reclamation.replaceOne({_id: id},postData)
     .then(data => {
        if(!data){
            return res.json({
                succes: 0,
                message: "Failed to update Reclamation"
            });
        }
        else{
            res.json({
                succes: 1,
                message: "Reclamation updated"
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
/////////////////////new featuer
exports.getbyUserId = (req, res) => {
        const id = req.params.id;
    
        Reclamation.find({UserId: id})
            .then(data => {
            if (!data)
                res.json({
                    succes: 0,
                    message: "Reclamation not found"
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


    exports.changeEtat = (req, res) => {
        const id = req.params.id;
        console.log("aaaaaaa")

        const reclamation =  Reclamation.findById(id);
    
        // copy userParam properties to user
        //Object.assign(forum, postData);
        console.log("aaaaaaa")

        reclamation.updateOne({_id: id},{
            $set :
            {
                "etat" : "Accord",
            }
        
        
        },).then(data => {
            console.log("aaaaaaa")


            main()



            if(!data){
                return res.json({
                    succes: 0,
                    message: "Failed to update Reclamation"
                });
            }
            else{
                res.json({
                    succes: 1,
                    message: "Reclamation updated"
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

