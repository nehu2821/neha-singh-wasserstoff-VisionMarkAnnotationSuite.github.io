# VisionMark AI: Backend Services

VisionMark AI is a cutting-edge, mobile-first application designed to simplify the data collection and annotation process for training datasets used in image recognition models, particularly YOLO models. This repository contains the backend services developed to support the VisionMark application.

## Project Scope

The backend services cover the following functionalities:

1. **Image Processing & Storage**: Efficiently upload and store images sent from the mobile frontend.
2. **Automatic Annotation**: Implemented an API for preliminary annotations on images using AI.
3. **User Management**: Developed a system for user authentication and authorization, including regular users and admins.
4. **Review & Approval Workflow**: Created endpoints for admins to review, approve, or reject annotated images.
5. **Data Exporting**: Admins can export approved annotations in CSV formats.

## Technologies Used

- **Node.js**: Chosen for its non-blocking, event-driven architecture, ideal for handling asynchronous operations like image processing.
- **MongoDB**: Utilized for its flexibility in storing and managing image data.
- **Express.js**: Used as the web application framework to build robust APIs.
- **JWT (JSON Web Tokens)**: Implemented for secure user authentication and authorization.

## Getting Started

To get started with VisionMark AI backend services, follow these steps:

1. **Clone the repository**: `git clone https://github.com/Dixit-56/dixit-pipalva-wasserstoff-VisionMarkAnnotationSuite`
2. **Install dependencies**: `npm install`
3. **Set up MongoDB**: Ensure MongoDB is installed and running locally or configure connection settings accordingly.
4. **Configure environment variables**: Set up environment variables for sensitive information such as database connection strings and JWT secrets.
5. **Start the server**: `npm run start`
6. **Explore the API documentation**: [Postman Collection](https://drive.google.com/file/d/17O9Mr3K2l4vC4ncgPdIWKvy7qmUpSmsP/view?usp=drive_link) , [Environment Variable](https://drive.google.com/file/d/1SmuOHchL7_YlzEkeG9tMpMIqax1DM4n8/view?usp=drive_link)
