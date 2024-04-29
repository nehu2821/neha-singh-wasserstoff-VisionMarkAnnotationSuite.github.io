import Image from "../models/imageModel.js";
import { StatusCode } from "../Services/statusCode.js";

// Endpoint for admins to review images
const reviewImages = async (req, res) => {
  try {
    const images = await Image.find({ reviewed: false });
    StatusCode.sendSuccessResponse(
      res,
      "Images fetched successfully for review",
      { images }
    );
  } catch (err) {
    StatusCode.InternalErrorResponse(
      res,
      "Failed to fetch images for review",
      err.message
    );
  }
};

// Endpoint for admins to approve or reject images
const approveImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    await Image.findByIdAndUpdate(imageId, {
      reviewed: true,
      status: "approved",
    });
    StatusCode.sendSuccessResponse(res, "Image approved successfully");
  } catch (err) {
    StatusCode.InternalErrorResponse(
      res,
      "Failed to approve image",
      err.message
    );
  }
};

const rejectImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    await Image.findByIdAndDelete(imageId, { status: "rejected" });
    StatusCode.sendSuccessResponse(res, "Image rejected successfully");
  } catch (err) {
    StatusCode.InternalErrorResponse(
      res,
      "Failed to reject image",
      err.message
    );
  }
};

export const reviewController = {
  reviewImages,
  approveImage,
  rejectImage,
};
