const mongoose = require("mongoose");
require("dotenv").config();

// Define the database URL and ports to attempt
const DATABASE_URL = "mongodb://localhost:27017/user";
const PORTS = [3000, 4000];

// Function to connect to the database without specifying a port
const dbConnect = async () => {
  let connected = false;

  for (const port of PORTS) {
    try {
      // Attempt to connect to MongoDB using the DATABASE_URL (including port if specified)
      await mongoose.connect(`${DATABASE_URL}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`Connected to MongoDB using DATABASE_URL`);
      connected = true;
      break; // Exit loop if connected successfully
    } catch (error) {
      console.error(`Error connecting to MongoDB:`, error.message);
    }
  }

  if (!connected) {
    console.error("Unable to connect to MongoDB");
  }
};

// Export the database URL, ports, and dbConnect function
module.exports = {
  DATABASE_URL,
  PORTS,
  dbConnect,
};
