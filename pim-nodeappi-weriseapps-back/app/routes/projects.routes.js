module.exports = app => {
    const projects = require("../controllers/projects.controller.js");
    var router = require("express").Router();
  
    router.post("/",projects.createProject);
    router.get("/",projects.getProjects);
    router.get("/:id",projects.getProjectByProjectId);
    router.get("/name/get",projects.getProjectByProjectName);
    router.delete("/",projects.deleteProjects);   
    router.get("/user/:id",projects.getProjectByUsersId);
    router.post("/getJson",projects.getJsonProject);           //yejbed les tables mel projet ou yab3athhom
    router.post("/getAllJson",projects.getAllJsonProject);   
    router.post("/updateJson",projects.updateJsonProject);     //Ybadel fel les function mta3 lprojet fel fichier json
    router.post("/generateProject",projects.generateProject);

    /*
    router.patch("/",projects.updateProjects);
    //////////////eli zedtou
    */
  
    app.use('/api/projects', router);
  };