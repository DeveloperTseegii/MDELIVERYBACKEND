const express = require("express");
const router = express.Router();
const FoodController = require("../controller/FoodController");
const UserController = require("../controller/UserController");
const OrderController = require("../controller/OrderController");
const validator = require("../middleware/create_update");
const auth = require("../middleware/auth");

//food
router.get("/food", auth, FoodController.get_foods);
router.post("/createFood", validator.createfood(), FoodController.create);
router.delete("/deleteFood/:id", FoodController.deleteFood);
router.post("/update/id/:id", FoodController.update);
router.get("/foodsearch", FoodController.foodSearch);

//user

router.get("/users", UserController.getUser);
router.get("/finduser/:name", UserController.findUser);
router.post(
  "/createUser",
  validator.userValidator(),
  UserController.createUser
);
router.post("/updateUser/userId/:id", UserController.updateUser);
router.delete("/deleteUser/user/:id", UserController.deleteUser);

//Order

router.get("/orders", auth, OrderController.getOrder);
router.post("/createOrder", auth, OrderController.createOrder);
router.delete("/deleteOrder/:id", auth, OrderController.deleteOrder);
router.post("/updateOrder/:id", auth, OrderController.updateOrder);
router.get("/findOrder/:id", auth, OrderController.findOne);

module.exports = router;
