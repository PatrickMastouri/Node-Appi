
module.exports = app => {
    const payments = require("../controllers/payments.controller.js");
    var router = require("express").Router();
  
    router.post("/add",payments.createPayment);
    router.get("/getAll",payments.getPayment);
    router.get("/:id",payments.getPaymentById);
    router.get("/name/get",payments.getPaymentByContent);
    router.delete("/:id",payments.deletePayment);
    router.get("/user/:id",payments.getPaymentByUsersId);
    ///// test update
    router.patch("/update/:id",payments.updatePayment);
    router.post("/upload/:id",payments.upload);
    router.post("/download/:id",payments.download);
  
    app.use('/api/payments', router);
  };