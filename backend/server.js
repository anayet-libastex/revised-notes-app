import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
dotenv.config({ quiet: true });

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on Port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
