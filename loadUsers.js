const axios = require("axios");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongoUri = process.env.MONGO_URI;

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  photoUrl: String,
  role: String,
  gender: String,
  address: String,
  phone: String,
  about: String,
  skills: mongoose.Schema.Types.Mixed,
});

const User = mongoose.model("User", userSchema);

const fetchAndLoadUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    // Fetch users from URL
    const response = await axios.get(
      "https://yoga-master-server.onrender.com/users"
    );
    const users = response.data;

    // Insert users into MongoDB
    await User.insertMany(users);
    console.log("Users loaded into database");

    // Disconnect from MongoDB
    await mongoose.disconnect();
  } catch (err) {
    console.error("Error loading users into database", err);
    process.exit(1);
  }
};

fetchAndLoadUsers();
