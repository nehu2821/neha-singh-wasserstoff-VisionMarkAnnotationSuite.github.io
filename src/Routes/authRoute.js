import express from "express";
import { userController } from "../Controllers/authController.js";
import validate from "../Middleware/validate.js";
import { user } from "../Validation/authValidation.js";

const router = express.Router();

// Route to register a new user
router.post(
  "/register-user",
  validate(user.registerUser),
  userController.registerUser
);

// Route to register a new admin
router.post(
  "/register-admin",
  validate(user.registerUser),
  userController.registerAdmin
);

// Route to log in
router.post("/login", validate(user.loginUser), userController.login);

export default {
  route: router,
};
