import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,

    unique: true,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model("User", userSchema);

export default User;
