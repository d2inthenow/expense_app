const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const db = process.env.MONGO_URL;

    if (!db) {
      throw new Error("❌ MONGO_URL is not defined in environment variables.");
    }

    const { connection } = await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connected to: ${connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

// ✅ CommonJS export
module.exports = { connectDB };
