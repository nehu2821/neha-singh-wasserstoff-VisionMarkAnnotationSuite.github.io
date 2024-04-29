import express from "express";
import { annotationController } from "../Controllers/annotationController.js";
import { auth } from "../Middleware/auth.js";

const router = express.Router();

// POST route to add annotation to an image
router.post("/add", auth(), annotationController.addAnnotation);

// Route to get annotated images by status
router.get(
  "/images/:status",
  auth(),
  annotationController.getAnnotatedImagesByStatus
);

export default {
  route: router,
};
