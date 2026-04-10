import mongoose from "mongoose";

const connection = async () => {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/employee_payroll";

  if (!process.env.MONGODB_URI) {
    console.warn("MONGODB_URI is not set. Falling back to local MongoDB at mongodb://127.0.0.1:27017/employee_payroll");
  }

  try {
    await mongoose.connect(uri);
    console.log(`MongoDB connected to ${uri}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connection;
