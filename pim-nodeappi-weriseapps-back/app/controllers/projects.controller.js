const db = require("../models");
const Project = db.projects;
const fs = require('fs');
const { request } = require("https");
const multer = require('multer');

//////////////////////////////////////////////////////  Create new project
exports.createProject = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a User
    const projet = new Project({
        name: req.body.name,
        description: req.body.description,
        payed: req.body.payed,
        visibility: req.body.visibility,
        port: req.body.port,
        image: req.body.image,
        user_id: req.body.user_id,
        groupe_id: req.body.groupe_id,
    });


    // Save User in the database
    projet
        .save(projet)
        .then(data => {
            if (!data) {
                return res.json({
                    succes: 0,
                    message: "Failed to create project"
                });
            }
            else {
                res.json({
                    succes: 1,
                    project: data,
                    message: "Project created"
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

//////////////////////////////////////////////////////  Get Projects
exports.getProjects = (req, res) => {
    Project.find().then(data => {
        if (!data)
            res.json({
                succes: 0,
                message: "projects not found"
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

//////////////////////////////////////////////////////  Get Projects by projectid
exports.getProjectByProjectId = (req, res) => {
    const id = req.params.id;

    Project.findById(id)
        .then(data => {
            if (!data)
                res.json({
                    succes: 0,
                    message: "project not found"
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

//////////////////////////////////////////////////////  Get Projects by projectname
exports.getProjectByProjectName = (req, res) => {
    const name = req.body.name;

    Project.findOne({ name: name }).then(data => {
        if (!data)
            res.json({
                succes: 0,
                message: "project not found"
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

//////////////////////////////////////////////////////  delete project
exports.deleteProjects = (req, res) => {
    const id = req.body.id;

    Project.findByIdAndRemove(id).then(data => {
        if (!data)
            res.json({
                succeded: 0,
                message: "project not found"
            })
        else
            res.json({
                succeded: 1,
                message: "project deleted succefully"
            })
    })
        .catch(err => {
            console.log(err);
            return;
        });
};

//////////////////////////////////////////////////////  Get Projects by projectname
exports.getProjectByUsersId = (req, res) => {
    const id = req.params.id;

    Project.find({ user_id: id }).then(data => {
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

//////////////////////////////////////////////////////  Get Projects by projectname
exports.getJsonProject = (req, res) => {
    const body = req.body;
    let Database = ""
    fs.readFile('./../projects/' + body.id + '/' + body.name + '.json', (err, data) => {
        if (err) {
            return res.json({
                succes: 0,
                message: "Project not found"
            })
        }
        try {
            Database = JSON.parse(data);
        } catch (e) {
            return res.json({
                succes: 0,
                message: "Error in the Project: Maybe Empty"
            })
        }
        return res.json({
            succes: 1,
            data: Database.tables,
            dbName: Database.dbName,
            dbType: Database.dbType,
            tables: Database.tables,
            connections: Database.connections
        })
    });
};
//////////////////////////////////////////////////////  Get Projects by projectname
exports.getAllJsonProject = (req, res) => {
    const body = req.body;
    let Database = ""
    fs.readFile('./../projects/' + body.id + '/' + body.name + '.json', (err, data) => {
        if (err) {
            return res.json({
                succes: 0,
                message: "Project not found"
            })
        }
        try {
            Database = JSON.parse(data);
        } catch (e) {
            return res.json({
                succes: 0,
                message: "Error in the Project: Maybe Empty"
            })
        }
        return res.json({
            dbName: Database.dbName,
            dbType: Database.dbType,
            tables: Database.tables,
            connections: Database.connections
        })
    });
};

//////////////////////////////////////////////////////  Get Projects by projectname
exports.updateJsonProject = (req, res) => {
    const body = req.body

    let filedata = ""
    fs.readFile('./../projects/' + body.id + '/' + body.pname + '.json', (err, data) => {
        if (err) {
            return res.json({
                succes: 0,
                message: "Project not found"
            })
        }

        try {
            filedata = JSON.parse(data);
        } catch (e) {
            return res.json({
                succes: 0,
                message: "Error in the Project: Not a json Or Empty / cant Parse"
            })
        }

        filedata.tables.forEach(element => {
            if (element.name == body.tname) {
                element.add = body.add
                element.delete = body.delete
                element.update = body.update
                element.show = body.show
            }
        });

        try {
            fs.writeFileSync('./../projects/' + body.id + '/' + body.pname + '.json', JSON.stringify(filedata, null, 4));
            return res.json({
                succes: 1,
                message: "Updated Successfully",
                data: filedata
            })
        } catch (e) {
            return res.json({
                succes: 0,
                message: "Error Saving Changes"
            })
        }

    });
};

//////////////////////////////////////////////////////  Get Projects by projectname
exports.generateProject = (req, res) => {


    var body = req.body

    const util = require('util');
    const exec = util.promisify(require('child_process').exec);

    multer({ dest: "../projects/" + body.id + "/" + body.projectName })
    multer({ dest: "../projects/" + body.id + "/" + body.projectName + "/config" })
    multer({ dest: "../projects/" + body.id + "/" + body.projectName + "/api" })
    multer({ dest: "../projects/" + body.id + "/" + body.projectName + "/api/services" })
    multer({ dest: "../projects/" + body.id + "/" + body.projectName + "/api/controllers" })
    multer({ dest: "../projects/" + body.id + "/" + body.projectName + "/api/routers" })


    const filesCommand = "touch ./../projects/" + body.id + "/" + body.projectName + "/app.js && touch ./../projects/" + body.id + "/" + body.projectName + "/.env && touch ./../projects/" + body.id + "/" + body.projectName + "/.gitignore && touch ./../projects/" + body.id + "/" + body.projectName + "/config/config.json && touch ./../projects/" + body.id + "/" + body.projectName + "/config/database.js && touch ./../projects/" + body.id + "/" + body.projectName + "/package.json"
    json = {
        "name": "nodeappinodejs",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1"
        },
        "author": "",
        "license": "ISC",
        "dependencies": {
            "atob": "^2.1.2",
            "bcrypt": "^5.0.1",
            "body-parser": "^1.19.0",
            "cors": "^2.8.5",
            "dotenv": "^8.2.0",
            "express": "^4.17.1",
            "fs-extra": "^9.1.0",
            "multer": "^1.4.2",
            "mysql": "^2.18.1",
            "path": "^0.12.7"
        }
    }
    //////////////////////////////////////////////////////////////////////////////  get the projectjsonfile
    function getjsontables() {
        let rawdata = fs.readFileSync("./../projects/" + body.id + "/" + body.projectName + ".json");
        tablesdata = JSON.parse(rawdata);
        return tablesdata
    }

    /////////////////////////////////////////////////////////////////////////////// creer les fichier et les dossier
    async function createfilesandfolders() {
        await exec(filesCommand, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            } else {
                json = JSON.stringify(json);
                fs.writeFileSync('./../projects/' + body.id + '/' + body.projectName + '/package.json', json, (err) => {
                    if (!err) {
                        console.log('done');
                        return;
                    }
                });
            }
        });
    }
    createfilesandfolders();

    //////////////////////////////////////////////////////////////////////////////  Insertincontroller
    function insertinappjs() {
        var tablesdata = getjsontables();
        var header = ' require("dotenv").config(); \n\ var cors = require("cors") \n\ const express = require("express"); \n\ var app = express(); \n\ app.use(cors()); \n\ app.use(express.json()); \n\ \n\ '
        var footer = '//Set the listner Port \n\    app.listen(process.env.APP_PORT, ()=>{ \n\      console.log("Server Started On Port", 3001) \n\    }); \n\ '
        var routes = ''
        tablesdata.tables.forEach(element => {
            routes += 'const ' + element.name + ' = require("./api/routers/' + element.name + '.router"); \n\ app.use("/api/' + element.name + '",' + element.name + '); \n\ \n\ '
        });
        fs.writeFile("./../projects/" + body.id + "/" + body.projectName + "/app.js", header + routes + footer, (err) => {
            if (!err) {
                console.log('done');
            } else {
                console.log(err)
            }
        });
    }
    insertinappjs();

    //////////////////////////////////////////////////////////////////////////////  Insertinservices
    function insertinservices() {
        var tablesdata = getjsontables();
        tablesdata.tables.forEach(element => {
            function createServiceFiles() {
                exec("touch ./../projects/" + body.id + "/" + body.projectName + "/api/services/" + element.name + ".js", (error, stdout, stderr) => {
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

            function writetoservice() {

                createServiceFiles();
                var header = "const pool = require ('../../config/database'); \n\ module.exports = \n\ { \n\ "
                var fncreatestring = "//Add      \n\ add: (data,callBack) => \n\ { \n\    pool.query('INSERT INTO " + element.name + " (id,'+JSON.parse(JSON.stringify(Object.keys(data))).toString()+') VALUES (NULL,?);',[Object.values(data)],(error,results,fields)=>{ \n\      if(error){          \n\ return callBack(error); \n\ } \n\ return callBack(null,results); \n\ }); \n\ }, \n\ \n\ \n\ "
                var fngetall = "//GetAll   \n\ show: callBack => { \n\ pool.query(' select * from " + element.name + "', \n\ [], \n\ (error, results, fields) => { \n\ if (error){ \n\ return callBack(error); \n\ } \n\ return callBack(null,results); }); \n\ },"
                var fndelete = "//Delete   \n\ delet: (data,callBack) => \n\ { \n\ pool.query('delete from " + element.name + " where id =?', \n\ [data.id] \n\ ,(error,results,fields)=>{ \n\ if(error){ \n\ return callBack(error); \n\ } \n\ return callBack(null,results); \n\ }); \n\ }, \n\ \n\ \n\ "
                var fnupdate = "//Update   \n\ update: (data,callBack) => \n\ { \n\ //fixedtime = toSqlDatetime(new Date(data.daten)) // 2016-06-23 01:54:16 \n\ \n\ pool.query('Update " + element.name + " SET ? WHERE id = ?', [data,data.id],(error,results,fields)=>{ \n\ if(error){ \n\ return callBack(error); \n\ } \n\ return callBack(null,results); \n\ }); \n\ }, \n\ "
                var footer = " \n\ };"
                var serviceContent = ""
                serviceContent += header
                if (element.add == "1") {
                    serviceContent += fncreatestring
                }
                if (element.show == "1") {
                    serviceContent += fngetall
                }
                if (element.delete == "1") {
                    serviceContent += fndelete
                }
                if (element.update == "1") {
                    serviceContent += fnupdate
                }
                serviceContent += footer

                fs.writeFile("./../projects/" + body.id + "/" + body.projectName + "/api/services/" + element.name + ".js", serviceContent, (err) => {
                    if (!err) {
                        console.log('done');
                    }
                });

            }
            writetoservice();
        });
    }
    insertinservices();

    //////////////////////////////////////////////////////////////////////////////  Insertincontroller
    function insertincontrollers() {
        var tablesdata = getjsontables();
        tablesdata.tables.forEach(element => {
            function createControllerFiles() {
                exec("touch ./../Projects/" + body.id + "/" + body.projectName + "/api/controllers/" + element.name + ".js", (error, stdout, stderr) => {
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
            function writetocontrollers() {
                createControllerFiles();

                var headers = "const { \n\ "
                var endheaders = "} = require('./complaint.service'); \n\ "
                var bodyheader = " \n\ module.exports = { "
                var bodyfooter = " \n\ }; "
                var fnadds = "/////////////////////////////////add    \n\  addc:    (req,res)=>{  \n\ const body = req.body; \n\  adds(body, (err, results) =>{ \n\   if(err){ \n\ return res.json({ \n\ succes: 0, \n\   message: err \n\ }); \n\ } \n\ if(!results){ \n\ return res.json({ \n\ succes: 0, \n\ message: 'Failed to create' \n\ }); \n\ } \n\ return res.json({ \n\ succes: 1, \n\ message: 'created' \n\ }) \n\ }); \n\ }, \n\ "
                var fnshows = "/////////////////////////////////show   \n\  showc:   (req,res)=>{  \n\ shows((err, results) => { \n\ if(err){ \n\ console.log(err); \n\ return; \n\ } \n\ return res.json({ \n\ succes: 1, \n\ data: results \n\ }) \n\ }); \n\ }, \n\ "
                var fndeletes = "/////////////////////////////////Delete \n\  deletec: (req,res)=>{  \n\ const data = req.body;    \n\ deletes(data,(err, results) => { \n\ if(err){ \n\ console.log(err); \n\ return; \n\ } \n\ if(!results){ \n\ return res.json({ \n\ succeded: 0, \n\ message: 'Record not found' \n\ }) \n\ } \n\ return res.json({ \n\ succeded: 1, \n\ message: 'deleted succefully' \n\ }) \n\ }); \n\ }, \n\ "
                var fnupdates = "/////////////////////////////////update \n\  updatec: (req,res)=>{  \n\ const body = req.body;    \n\ updates(body, (err, results) => { \n\ if(err){ \n\ return res.json({ \n\ succes: 0, \n\ message: err \n\ }); \n\ } \n\ if(!results){ \n\ return res.json({ \n\ succes: 0, \n\ message: 'Failed to update Complaint' \n\ }); \n\ } \n\ return res.json({ \n\ succes: 1, \n\ message: 'Updated Succefully' \n\ }) \n\ }); \n\ }, \n\ "


                var controllerContent = ""
                controllerContent += bodyheader
                if (element.add == "1") {
                    controllerContent += fnadds
                    headers += "adds, \n\ "
                }
                if (element.show == "1") {
                    controllerContent += fnshows
                    headers += "shows, \n\ "
                }
                if (element.delete == "1") {
                    controllerContent += fndeletes
                    headers += "deletes, \n\ "
                }
                if (element.update == "1") {
                    controllerContent += fnupdates
                    headers += "updates, \n\ "
                }
                controllerContent += bodyfooter
                headers += endheaders

                fs.writeFile("./../projects/" + body.id + "/" + body.projectName + "/api/controllers/" + element.name + ".js", headers + controllerContent, (err) => {
                    if (!err) {
                        console.log('done');
                    }
                });

            }
            writetocontrollers();
        });

    }
    insertincontrollers();

    //////////////////////////////////////////////////////////////////////////////  Insertincontroller
    function insertinroutes() {

        var tablesdata = getjsontables();

        tablesdata.tables.forEach(element => {
            function createRouterFiles() {
                exec("touch ./../Projects/" + body.id + "/" + body.projectName + "/api/routers/" + element.name + ".js", (error, stdout, stderr) => {
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
            function writetoroutes() {
                createRouterFiles();
                var headers = "const { \n\ "
                var endheaders = '} = require("./../services/' + element.name + '"); \n\ '
                var bodyheader = 'const router = require("express").Router(); \n\ '
                var bodyfooter = 'module.exports = router; \n\ '
                var fnadd = 'router.post("/",addc); \n\ '
                var fndelete = 'router.delete("/",deletec); \n\ '
                var fnmodif = 'router.patch("/",updatec); \n\ '
                var fnshow = 'router.get("/",showc); \n\ '


                var routerContent = ""
                routerContent += bodyheader
                if (element.add == "1") {
                    routerContent += fnadd
                    headers += "add, \n\ "
                }
                if (element.show == "1") {
                    routerContent += fnshow
                    headers += "show, \n\ "
                }
                if (element.delete == "1") {
                    routerContent += fndelete
                    headers += "delete, \n\ "
                }
                if (element.update == "1") {
                    routerContent += fnmodif
                    headers += "update, \n\ "
                }
                headers += endheaders

                fs.writeFile("./../projects/" + body.id + "/" + body.projectName + "/api/routers/" + element.name + ".js", headers + routerContent + bodyfooter, (err) => {
                    if (!err) {
                        console.log('done');
                    }
                });

            }
            writetoroutes();
        });

    }
    insertinroutes();

    ///////////////////////////////////////////////////////////////////////////////npm install
    function installnpm() {
        exec("cd ./../projects/" + body.id + "/" + body.projectName + " && npm install", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            return 1;
        });
    }
    installnpm();


};


