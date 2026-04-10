import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    dept: {
      type: String,
      required: true,
    },
    basic_sal: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    photo_url: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Employee", employeeSchema);
