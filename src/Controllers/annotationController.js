import Annotation from "../Models/annotationModel.js";
import Image from "../models/imageModel.js";
import { StatusCode } from "../Services/statusCode.js";

const addAnnotation = async (req, res) => {
  try {
    const { imageId, label, boundingBox } = req.body;

    // Validate incoming data
    if (!imageId || !label || !boundingBox) {
      return StatusCode.sendBadRequestResponse(res, "Missing required fields");
    }

    // Create new annotation
    const annotation = new Annotation({ label, boundingBox });
    await annotation.save();

    // Associate annotation with image
    const image = await Image.findById(imageId);
    if (!image) {
      return StatusCode.sendNotFoundResponse(res, "Image not found");
    }
    image.annotations.push(annotation);
    await image.save();

    StatusCode.sendSuccessResponse(res, "Annotation added successfully");
  } catch (error) {
    console.error("Error adding annotation:", error);
    StatusCode.InternalErrorResponse(res, "Failed to add annotation");
  }
};

// Controller to get annotated images by status
const getAnnotatedImagesByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    // Validate status
    if (!status) {
      return StatusCode.sendBadRequestResponse(
        res,
        "Status parameter is required"
      );
    }
    const annotatedImages = await Image.find({ status });

    StatusCode.sendSuccessResponse(
      res,
      "Annotated images fetched successfully",
      { annotatedImages }
    );
  } catch (error) {
    console.error("Error fetching annotated images:", error);
    StatusCode.InternalErrorResponse(res, "Failed to fetch annotated images");
  }
};

export const annotationController = {
  addAnnotation,
  getAnnotatedImagesByStatus,
};
