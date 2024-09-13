const express = require("express");
require("dotenv").config();

const { expressjwt: jwt } = require("express-jwt");

// const testObj = {
//   name: "Test"
// }

// const { name: ime } = testObj;
// console.log('name', name);

const connectDB = require("./pkg/db/config");
connectDB();

const { getSection } = require("./pkg/config");
const {
  login,
  register,
  refreshToken,
  resetPassword,
} = require("./handlers/auth");

const {
  getAllCars,
  updateCar,
  removeCar,
  createCar,
} = require("./handlers/cars");

const app = express();

app.use(express.json());
app.use(
  jwt({
    secret: `${process.env.jwt_secret}`,
    algorithms: ["HS256"],
  }).unless({
    path: ["/auth/login", "/auth/register", "/auth/reset"],
  })
);

app.get("/", (req, res) => res.send("Hello World"));
app.post("/auth/login", login);
app.post("/auth/register", register);
app.post("/auth/refresh", refreshToken);
app.post("/auth/reset", resetPassword);

app.get("/cars", getAllCars);
app.post("/cars", createCar);
app.put("/cars/:id", updateCar);
app.delete("/cars/:id", removeCar);

app.listen(process.env.PORT, () =>
  console.log(`Server started at port ${process.env.PORT}!`)
);
