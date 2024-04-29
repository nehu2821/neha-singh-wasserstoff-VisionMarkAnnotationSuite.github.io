// imageController.js
import path from "path";
import Image from "../models/imageModel.js";
import Annotation from "../Models/annotationModel.js";
import { StatusCode } from "../Services/statusCode.js";

const associateAnnotations = async (req, res) => {
  try {
    const { imageId, annotationIds } = req.body;

    // Find the image by ID
    const image = await Image.findById(imageId);
    if (!image) {
      return StatusCode.sendNotFoundResponse(res, "Image not found");
    }

    // Find annotations by IDs
    const annotations = await Annotation.find({ _id: { $in: annotationIds } });

    // Associate annotations with the image
    image.annotations.push(...annotations.map((annotation) => annotation._id));

    // Save the updated image
    await image.save();

    StatusCode.sendSuccessResponse(
      res,
      "Annotations associated with image successfully",
      { image }
    );
  } catch (err) {
    StatusCode.InternalErrorResponse(res, err.message);
  }
};

// Upload an image
const uploadImage = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return StatusCode.sendBadRequestResponse(res, "No images uploaded");
    }

    const filenames = [];
    const paths = [];

    for (const file of req.files) {
      const filename = path.basename(file.originalname);
      const filePath = path.basename(file.path);

      filenames.push(filename);
      paths.push(filePath);
    }

    const image = new Image({
      filenames,
      paths,
      reviewed: false,
      annotations: [],
    });
    await image.save();

    StatusCode.sendSuccessResponse(res, "Images uploaded successfully", {
      image,
    });
  } catch (err) {
    console.error("Error uploading image:", err);
    StatusCode.InternalErrorResponse(res, err.message);
  }
};

// Get all images
const getImages = async (req, res) => {
  try {
    const images = await Image.find();
    StatusCode.sendSuccessResponse(res, "Images fetched successfully", {
      images,
    });
  } catch (err) {
    StatusCode.InternalErrorResponse(res, err.message);
  }
};

// Get a single image by ID
const getImageById = async (req, res) => {
  try {
    const imageId = req.params.id;
    const image = await Image.findById(imageId);
    if (!image) {
      return StatusCode.sendNotFoundResponse(res, "Image not found");
    }
    StatusCode.sendSuccessResponse(res, "Image fetched successfully", {
      image,
    });
  } catch (err) {
    StatusCode.InternalErrorResponse(res, err.message);
  }
};

// Delete an image by ID
const deleteImageById = async (req, res) => {
  try {
    const imageId = req.params.id;
    const deletedImage = await Image.findByIdAndDelete(imageId);
    if (!deletedImage) {
      return StatusCode.sendNotFoundResponse(res, "Image not found");
    }
    StatusCode.sendSuccessResponse(res, "Image deleted successfully");
  } catch (err) {
    StatusCode.InternalErrorResponse(res, err.message);
  }
};

export const imageController = {
  associateAnnotations,
  uploadImage,
  getImages,
  getImageById,
  deleteImageById,
};
