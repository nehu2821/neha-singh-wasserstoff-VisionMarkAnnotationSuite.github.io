// controllers/exportController.js
import fs from "fs";
import path from "path";
import Annotation from "../Models/annotationModel.js";
import { StatusCode } from "../Services/statusCode.js";

const exportAnnotations = async (req, res) => {
  try {
    // Fetch annotations from the database
    const annotations = await Annotation.find();

    // Define CSV header
    const header = [
      "Label",
      "TopLeft-X",
      "TopLeft-Y",
      "BottomRight-X",
      "BottomRight-Y",
    ];
    // Get current module file path
    const currentFilePath = new URL(import.meta.url).pathname;
    // Resolve CSV folder path relative to the current module file
    const csvFolderPath = path.resolve(path.dirname(currentFilePath), "../CSV");
    const csvFilePath = path.join(csvFolderPath, "annotations.csv");

    // Create a writable stream to write CSV data
    const writableStream = fs.createWriteStream("annotations.csv");
    writableStream.write(`${header.join(",")}\n`);

    // Iterate over annotations and write data to CSV
    annotations.forEach((annotation) => {
      const { label, boundingBox } = annotation;
      const { topLeft, bottomRight } = boundingBox;
      const rowData = [
        label,
        topLeft.x,
        topLeft.y,
        bottomRight.x,
        bottomRight.y,
      ];
      writableStream.write(`${rowData.join(",")}\n`);
    });

    // Close the writable stream
    writableStream.end();

    // Construct download link
    const downloadLink = `${req.protocol}://${req.get(
      "host"
    )}/export/csv/download/annotations.csv`;

    // Send success response with file path
    StatusCode.sendSuccessResponse(res, "Annotations exported successfully", {
      filePath: csvFilePath,
      downloadLink,
    });
  } catch (error) {
    console.error("Error exporting annotations:", error);
    StatusCode.InternalErrorResponse(res, "Failed to export annotations");
  }
};

export { exportAnnotations };
