module.exports = app => {
  const dishes = require("../controllers/dish.controller");
  var upload = require('../multer/upload');

  var router = require("express").Router();

  // Create a new Dish
  // DECOMMENT:
  router.post("/", upload.single('file'), dishes.create);
  // router.post("/", dishes.create);

  // Retrieve all Dishes
  router.get("/", dishes.findAll);

  // Retrieve a single Dish with id
  router.get("/:id", dishes.findOne);

  // Update a Dish with id
  router.put("/:id", upload.single('file'), dishes.update);

  // Delete a Dish with id
  router.delete("/:id", dishes.delete);

  app.use("/api/dishes", router);
}