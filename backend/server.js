require("dotenv").config();

const mongoose = require("mongoose");

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log(
      `✅ MongoDB Atlas Connected: ${mongoose.connection.name}`
    );
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  }
}

connectDatabase();