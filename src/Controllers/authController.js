import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";
import { StatusCode } from "../Services/statusCode.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, address, phone_no, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return StatusCode.conflictWithClient(res, "Email already exists");
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      address,
      phone_no,
      password: hashedPassword,
    });
    StatusCode.sendSuccessResponse(
      res,
      "User registered successfully",
      newUser
    );
  } catch (error) {
    StatusCode.InternalErrorResponse(res, error.message);
  }
};

const registerAdmin = async (req, res) => {
  try {
    const { username, email, address, phone_no, password } = req.body;

    // Check if email already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return StatusCode.conflictWithClient(
        res,
        "Admin with this email already exists"
      );
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await User.create({
      username,
      email,
      address,
      phone_no,
      password: hashedPassword,
      role: "admin", // Set role to admin
    });
    StatusCode.sendSuccessResponse(res, "Admin registered successfully", {
      admin: newAdmin,
    });
  } catch (error) {
    StatusCode.InternalErrorResponse(res, error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return StatusCode.sendNotFoundResponse(res, "User not found");
    }
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return StatusCode.sendUnauthorizedResponse(res, "Invalid credentials");
    }

    // Check user role
    const role = user.role;
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    // Set success message based on role
    const successMessage =
      role === "user" ? "User login successful" : "Admin login successful";
    StatusCode.sendSuccessResponse(res, successMessage, { user, token });
  } catch (error) {
    StatusCode.InternalErrorResponse(res, error.message);
  }
};

export const userController = {
  registerUser,
  registerAdmin,
  login,
};
