import express from "express";
import dbconnect from "./src/Config/database.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { index } from "./src/Routes/index.js";

dotenv.config();
dbconnect();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", index.User.route);
app.use("/review", index.Review.route);
app.use("/image", index.Image.route);
app.use("/annotate", index.Annotation.route);
app.use("/export", index.Export.route);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
