
const db = require("../models");
const Payment = db.payments;
const { exec } = require("child_process");
const path = require('path');

exports.createPayment = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a User
    const payment = new Payment({
        nom: req.body.nom,
        cost: req.body.cost,
        paymentmethode: req.body.paymentmethode,
        user_id: req.body.user_id,
        project_id: req.body.project_id,

    });


    // Save User in the database
    payment
        .save(payment)
        .then(data => {
            if (!data) {
                return res.json({
                    succes: 0,
                    message: "Failed to create payment"
                });
            }
            else {
                res.json({
                    succes: 1,
                    message: "payment created"
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
exports.getPayment = (req, res) => {
    Payment.find().then(data => {
        if (!data)
            res.json({
                succes: 0,
                message: "payments not found"
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
exports.getPaymentById = (req, res) => {
    const id = req.params.id;

    Payment.findById(id)
        .then(data => {
            if (!data)
                res.json({
                    succes: 0,
                    message: "payment not found"
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
exports.getPaymentByContent = (req, res) => {
    const nom = req.body.nom;

    Payment.findOne({ nom: nom }).then(data => {
        if (!data)
            res.json({
                succes: 0,
                message: "payment not found"
            })
        else
            res.json({
                succes: 1,
                data: data
            })
    })
        .catch(err => {
            console.log(err);
            return;
        });
};

//get paymentby iduser
exports.getPaymentByUsersId = (req, res) => {
    const id = req.params.id;

    Payment.find({ user_id: id }).then(data => {
        if (!data)
            res.json({
                succes: 0,
                message: "Projects not found for this user"
            })
        else
            res.json({
                succes: 1,
                data: data
            })
    })
        .catch(err => {
            console.log(err);
            return;
        });
};


//////////////////////////////////////////////////////delete project
exports.deletePayment = (req, res) => {
    const id = req.params.id;

    Payment.findByIdAndRemove(id).then(data => {
        if (!data)
            res.json({
                succeded: 0,
                message: "payment not found"
            })
        else
            res.json({
                succeded: 1,
                message: "payment deleted succefully"
            })
    })
        .catch(err => {
            console.log(err);
            return;
        });
};

//// testUpdte
exports.updatePayment = (req, res) => {
    const id = req.params.id;
    const postData = req.body;
    const payment = Payment.findById(id);

    // copy userParam properties to user
    //Object.assign(forum, postData);

    payment.replaceOne({ _id: id }, postData)
        .then(data => {
            if (!data) {
                return res.json({
                    succes: 0,
                    message: "Failed to update payment"
                });
            }
            else {
                res.json({
                    succes: 1,
                    message: "payment updated"
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

exports.upload = (req, res) => {
    const id = req.params.id;
    const port = req.body.port;
    const name = req.body.name;
    console.log(req.body)
    exec("cd ../projects/"+id+"/js/ && docker build -t "+name+" -f node.dockerfile . && docker run -p "+port+":"+port+" --link mongodb --network nodeapp-network --name "+name+" "+name+"", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return; 
        }
        console.log(`stdout: ${stdout}`);
    });
}

exports.download = (req, res) => {
    const id = req.params.id;


/*
    Payment.findOne({ project_id: id }).then(data => {
        if (!data)
            res.json({
                succes: 0,
                message: "payment not found"
            })
        else
            exec("cd ../projects/"+id+" && tar -zcvf "+id+".tar.gz js");
        res.json({
            succes: 1,
            data: data
        })
    })
        .catch(err => {
            console.log(err);
            return;
        });

        */
        exec("cd ../projects/"+id+" && tar -zcvf js.tar.gz js", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return; 
            }
            console.log(`stdout: ${stdout}`);
        });

        exec("cd ../projects/"+id+" && tar -zcvf js.tar.gz js", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return; 
            }
            console.log(`stdout: ${stdout}`);
        });
        //const file = path.resolve("../../projects", `./js.tar.gz`);
        //No need for special headers
        //res.download(file); 
    

    /*
    const id = req.params.id;
    const payment =  Payment.findById(id);
    payment.project_id
     x = fs.writeFile("./../projects/"+body.id+"/"+body.projectName+"/api/controllers/"+element.name+".js", headers+controllerContent , (err) => {
        if (!err) {
            console.log('done');
        }
    });
    exec("tar -zcvf"+" "+ x + ".tar.gz ")
        */
}