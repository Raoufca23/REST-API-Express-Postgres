module.exports = app => {
    const reserves = require("../controllers/reserve.controller.js");
  
    var router = require("express").Router();
  
    // Create a new reserve
    router.post("/", reserves.create);
  
    // Retrieve all reserves
    router.get("/", reserves.findAll);

    // Retrieve a single reserve with id
    router.get("/:id", reserves.findOne);
    
    // Update a reserve with id
    router.put("/:id", reserves.update);
  
    // Delete a reserve with id
    router.delete("/:id", reserves.delete);
  
    // Delete all reserves
    router.delete("/", reserves.deleteAll);
  
    app.use('/api/reserves', router);
  };