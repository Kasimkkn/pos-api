import mongoose from "mongoose";

export const connectDB = async (url) => {
  try {
    await mongoose.connect(url)
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    const fallbackUrl = process.env.MONGO_URI ;
    console.log("Trying fallback URL:", fallbackUrl);
    await mongoose.connect(fallbackUrl);
    console.log("Connected to MongoDB using fallback URL");
  }
};
