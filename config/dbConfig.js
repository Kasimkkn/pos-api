import mongoose from "mongoose";

export const connectDB = async (url) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    const fallbackUrl = process.env.MONGO_URI || process.env.MONGO_URI_LOCAL;
    console.log("Trying fallback URL:", fallbackUrl);
    await mongoose.connect(fallbackUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB using fallback URL");
  }
};
