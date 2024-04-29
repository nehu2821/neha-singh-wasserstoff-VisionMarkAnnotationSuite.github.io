import express from "express";
import { imageController } from "../Controllers/imageController.js";
import { auth } from "../Middleware/auth.js";
import multer from "multer";
const router = express.Router();
const upload = multer({ dest: "src/uploads/" });

// Route for uploading images
router.post(
  "/upload",
  auth(),
  upload.array("images"),
  imageController.uploadImage
);

// Route for getting all images
router.get("/", auth(), imageController.getImages);

// Route for getting a single image by ID
router.get("/:id", auth(), imageController.getImageById);

// Route for deleting an image by ID
router.delete("/:id", auth(), imageController.deleteImageById);

export default {
  route: router,
};
