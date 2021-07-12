const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const {sign} = require("jsonwebtoken");
const sgMail = require ("@sendgrid/mail");

const db = require("../models");
const User = db.users;

//////////////////////////////generate a randome code for forget password
var passcode = "";
function makeForgetPasswordCode(length) {
var result           = '';
var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
var charactersLength = characters.length;
for ( var i = 0; i < length; i++ ) {
   result += characters.charAt(Math.floor(Math.random() * charactersLength));
}
return result;
}

//////////////////////////////////////////////////////Create new user walla nsamiouha Register
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return; 
    }
  
    // crypt the password
    const salt = genSaltSync(10);
    req.body.password = hashSync(req.body.password, salt);

    // Create a User
    const user = new User({
        nom:        req.body.nom,
        prenom:     req.body.prenom,
        username:   req.body.username,
        password:   req.body.password,
        mail:       req.body.mail,
        gender:     req.body.gender,
        daten:      req.body.daten,
        adress:     req.body.adress,
        city:       req.body.city,
        postalcode: req.body.postalcode,
        image :     req.body.image,
        phone:      req.body.phone,
        role:       req.body.role,
        active:     req.body.active
    });

    //prepare the mail
    const mail = req.body.mail
    const url = `http://localhost:8080/api/users/confirmation/${mail}` //Create El url ely bch yactivy bih el compte
    sgMail.setApiKey("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");
    const msg = {
        to: "aziz.arfaoui@esprit.tn",
        from: "aziz99arfaoui@gmail.com",
        subject: "Confirm Email For account",
        text: "Please Click this to verify your account",
        html: url
    };
    //send the mail
    sgMail.send(msg).then(() => {
        console.log('Message sent')
    }).catch((error) => {
        console.log(error.response.body)
        })

    // Save User in the database
    user
      .save(user)
      .then(data => {
        //Create the token
        const jsontoken = sign({id: data.id,nom: data.nom},"qwe1234",{expiresIn: "1h" }); 
        res.send({
            success: 1,
            message: "Registred successfully please check your mail to verify youre account",
            token: jsontoken,
            id: data.id,
            nom: data.nom
         });
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
            succes: 0,
            message: "Email Or UserName is Used"
        })
      });
};

//////////////////////////////////////////////////////Get User By user id ely yeteb3ath fel parameters
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findById(id)
        .then(data => {
        if (!data)
            res.json({
                succes: 0,
                message: "record not found"
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

//////////////////////////////////////////////////////Get Users
exports.getUsers = (req, res) => {

    User.find().then(data => {
        if (!data)
            res.json({
                succes: 0,
                message: "record not found"
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

//////////////////////////////////////////////////////Get User by user mail
exports.getUserByUserMail = (req, res) => {
    const mail = req.params.mail;

    User.findOne({ mail : mail}).then(data => {
        if (!data)
            res.json({
                succes: 0,
                message: "record not found"
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

/////////////////////////////////////////////////////deleteuser
exports.deleteUsers = (req, res) => {
    const id = req.body.id;

    User.findByIdAndRemove(id).then(data => {
        if (!data)
            res.json({
                succeded: 0,
                message: "Record not found"
            })
        else
            res.json({
                succeded: 1,
                message: "deleted succefully"
            })
        })
        .catch(err => {
            console.log(err);
            return ;
        });
        
};

/////////////////////////////////////////////////////login
exports.login = (req, res) => {
    const body = req.body;
    User.findOne({ mail : body.mail} ).then(data => {
        if (!data)
            res.json({
            success: 0,
            message: "No Account With This Mail"
        });
        else{
            const result = compareSync(body.password, data.password);        //check the password
            if(result)
            {
                data.password = undefined;                               //Hide the password
                const jsontoken = sign({id: data.id},"qwe1234",{expiresIn: "1h" });     //create the token
                res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken,
                    id: data.id,
                    role: data.role });
            }    
            else{
                res.json({
                    success: 0,
                    message: "Invalide Password" });}
        }
        })
        .catch(err => {
            res.json({
                success: 0,
                message: "mal9itouch"
            });
            console.log(err)
        });

};

/////////////////////////////////////////////////////forgetpassword
exports.sendPasswordCode = (req, res) => {

    const mail = req.body.mail;
    passcode = makeForgetPasswordCode(5);                                   //Generate the random Code

    User.findOne({ mail : mail }).then(data => {
        if (!data)
            res.json({
                success: 0,
                message: "Invalide Email"
            });
        else{
            //Prepare to Send the code to the user email("ne9es nekhou el mail ely teb3ath fel req ou n7otou fy blaset el mail mte3y ely njareb bih")
            sgMail.setApiKey("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"); 
            const msg = 
            {   to: "aziz.arfaoui@esprit.tn",
                from: "aziz99arfaoui@gmail.com",
                subject: "Code to Reset your password",
                text: "Please Copy and paste this code to change your password",
                html: passcode };

            //Send the Mail with the Code
            if (sgMail.send(msg)){
                res.json({
                    succes: 1,
                    message: "Code sent to your mail"})
            }
            res.json({
                succes: 0,
                message: "message not sent"})
        }
        })
        .catch(err => {
            res.json({
                success: 0,
                message: err
            });
        });

};

/////////////////////////////////////////////////////changepassword
exports.passwordChange = (req, res) => {

    const body = req.body;
    const mail = body.mail;     
    const salt = genSaltSync(10);                          
    body.password = hashSync(body.password, salt);          //crypt the new password
    code = body.code;  
    User.findOne({ mail : mail}).then(data => {
        if (!data){
            res.json({
                success: 0,
                message: "Invalide Email"
            });
        }
        else{
            if(code == passcode)                //if code is verified we change the password
            {        
                    User.updateOne({_id: data.id},{$set: {password: body.password}})
                    .then(data2 => {
                    if(err){
                        res.json({
                            succes: 0,
                            message: err
                        });
                    }else 
                    if(!data2){
                        res.json({
                            succes: 0,
                            message: "Failed to Change password"
                        });
                    }else
                    res.json({
                        succes: 1,
                        message: "password Changed Succefully Please Try To Reconnect"
                    })
                });
            }else{
                return res.json({
                    succes: 0,
                    message: "Code dosent match"})
            } 
        }
        })
    
};

/////////////////////////////////////////////////////updateuser (MazeletMate5demech)
exports.updateUsers = (req, res) => {
    const id = req.body.id;
    const userData = req.body;
    const user =  User.findById(id);

    user.updateOne({_id: id},userData)
     .then(data => {
        console.log(userData);
        console.log(data);
        if(!data){
            return res.json({
                succes: 0,
                message: "Failed to update User"
            });
        }
        else{
            res.json({
                succes: 1,
                message: "User updated"
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