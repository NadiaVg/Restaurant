const db = require("../models");
const Dish = db.dishes;
const Op = db.Sequelize.Op;

// Create and Save a new Dish
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.category || !req.body.price){
    res.status(400).send({
      message: "Content cannot be empty!"
    });
  }

  // Create a Dish
  const dish = {
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    filename: req.file ? req.file.filename : ""
  }

  // Save Dish in the database
  Dish.create(dish).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the dish"
    })
  });
};

// Retrieve all Dishs from the database.
exports.findAll = (req, res) => {
  Dish.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving all Dishs"
    })
  })
};

// Find a single Dish with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log(id)

  Dish.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Dish with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Dish with id=" + id
      });
    });
};


// UPdate

exports.update = (req, res) => {

  const id = req.params.id;
  if (!req.body.name || !req.body.category || !req.body.price){
    res.status(400).send({
      message: "Content cannot be empty!"
    });
  }

  // Create a Dish
  const dish = {
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    filename: req.file
  }

  Dish.update(dish, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Dish was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Dish with id=${id}. Maybe Dish was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Dish with id=" + id
      });
    });
};

// Delete

exports.delete = (req, res) => {
  const id = req.params.id;

  Dish.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Dish was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Dish with id=${id}. Maybe Dish was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Dish with id=" + id
      });
    });
};