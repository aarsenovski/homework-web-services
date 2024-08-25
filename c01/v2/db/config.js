const mongoose = require("mongoose");

const uri =
  "mongodb+srv://andrejarsenovski:<db_password>@cluster9999.k6bsqel.mongodb.net/?retryWrites=true&w=majority&appName=Cluster9999";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
  }
}

module.exports = connect;
