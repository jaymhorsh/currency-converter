import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
  { collection: "users" }
);

// Create a collection in mongodb called user based on the field or properties in userSchema
const User = mongoose.model("user", userSchema);

export default User;
