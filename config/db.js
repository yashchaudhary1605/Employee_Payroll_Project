import mongoose from "mongoose";

const connection = async () => {
  const candidates = [
    "MONGODB_URI",
    "MONGO_URI",
    "MONGO_URL",
    "MONGODB_URL",
    "DATABASE_URL",
    "RAILWAY_MONGODB_URI",
    "RAILWAY_MONGO_URL",
    "RAILWAY_DATABASE_URL",
  ];

  const envStatus = candidates.reduce((acc, name) => {
    acc[name] = Boolean(process.env[name]);
    return acc;
  }, {});

  console.log("MongoDB env vars present:", envStatus);

  const uriName = candidates.find((name) => Boolean(process.env[name]));
  const uri = uriName ? process.env[uriName] : null;

  if (!uri) {
    console.error(
      "MongoDB connection failed: no MongoDB URI provided.\n" +
        "Set one of: MONGODB_URI, MONGO_URI, MONGO_URL, MONGODB_URL, DATABASE_URL, RAILWAY_MONGODB_URI, RAILWAY_MONGO_URL, or RAILWAY_DATABASE_URL."
    );
    process.exit(1);
  }

  console.log(`Using MongoDB URI from ${uriName}`);

  try {
    await mongoose.connect(uri);
    console.log(`MongoDB connected to ${uriName}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connection;
