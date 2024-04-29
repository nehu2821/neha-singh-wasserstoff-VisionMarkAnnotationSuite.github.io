import express from "express";
import { exportAnnotations } from "../Controllers/exportController.js";
import path from "path";
import { auth } from "../Middleware/auth.js";

const router = express.Router();

// Endpoint for exporting annotations data
router.get("/", auth(), exportAnnotations);

// Route to serve the CSV file for download
router.get("/csv/download/annotations.csv", (req, res) => {
  const filePath = path.join("annotations.csv");
  res.download(filePath);
});

export default {
  route: router,
};
