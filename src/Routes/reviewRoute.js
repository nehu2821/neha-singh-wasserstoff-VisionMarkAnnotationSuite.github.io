import express from "express";
import { reviewController } from "../Controllers/reviewController.js";
import { auth } from "../Middleware/auth.js";

const router = express.Router();

// Route for reviewing images
router.get("/", auth(), reviewController.reviewImages);

// Route for approving an image by ID
router.put("/approve/:imageId", auth(), reviewController.approveImage);

// Route for rejecting an image by ID
router.put("/reject/:imageId", auth(), reviewController.rejectImage);

export default {
  route: router,
};
