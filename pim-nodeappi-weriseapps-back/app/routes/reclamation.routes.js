module.exports = app => {
    const reclamations = require("../controllers/reclamations.controller.js");
    var router = require("express").Router();
  
    router.post("/add",reclamations.createRec);
    router.get("/getAll",reclamations.getRec);
    router.get("/:id",reclamations.getRecById);
    router.delete("/:id",reclamations.deleteRec);
    
    ///// test update
    router.patch("/update/:id",reclamations.updateRec);
    router.get("/user/:id",reclamations.getbyUserId);
    router.patch("/Etat/:id",reclamations.changeEtat);

  
    app.use('/api/reclamations', router);
  };