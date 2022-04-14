const { body, validationResult } = require("express-validator");

const createfood = () => {
  return [
    body("name").not().isEmpty(),
    body("price").not().isEmpty().withMessage("Price empty!"),
    body("discount").isNumeric().isLength({ min: 0, max: 100 }),
    body("portion").isNumeric(),
    body("stock")
      .isNumeric()
      .isLength({ min: 0 })
      .withMessage("Can't be less than 0"),
    body("ingredients").not().isEmpty(),
    body("status").not().isEmpty(),
    body("sales").isBoolean(),
    body("category.name").not().isEmpty(),
    body("category.color").not().isEmpty(),
  ];
};

const userValidator = () => {
  return [
    body("name").not().isEmpty(),
    body("email").not().isEmpty().withMessage("email is not empty"),
    body("phone").not().isEmpty(),
    body("password").not().isEmpty(),
    body("role_id").not().isEmpty().withMessage("fill the role"),
  ];
};

module.exports = { createfood, userValidator };
