module.exports = (sequelize, Sequelize) => {
  const Dish = sequelize.define("dish", {
    name: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.STRING
    },
    filename: {
      type: Sequelize.STRING
    }
  });

  return Dish;
}