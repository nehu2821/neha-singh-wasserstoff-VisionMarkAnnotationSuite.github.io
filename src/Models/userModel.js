import mongoose from "mongoose";

// CreateUser Model Schema:
const UserSchema = new mongoose.Schema(
  {
    username: { type: String },
    email: { type: String, unique: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    password: { type: String },
    address: { type: String },
    phone_no: { type: String, unique: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
