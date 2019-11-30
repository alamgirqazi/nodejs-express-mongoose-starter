const express = require("express");
const router = express.Router();

const UserController = require('../controllers/users.controllers');
const checkAuth = require('../middleware/check-auth');

// router.get("/",UserController.sampleUser);
router.get("/",UserController.getAll);
router.post("/login",UserController.loginUser);
router.post("/register",UserController.registerUser);
router.get("/:_id",UserController.getSingleUser);
// router.post("/",UserController.addUser);
router.put("/:_id", UserController.updateUser);
router.delete("/:_id", UserController.deleteUser);


module.exports = router;