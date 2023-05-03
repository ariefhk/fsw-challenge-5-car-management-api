const router = require("express").Router();

// import routes
const auth = require("./authRoute");
const cars = require("./carRoute");
// const docs = require("./docs");

// Routes API/v1
router.use("/api/v1/auth", auth);
router.use("/api/v1/cars", cars);

module.exports = router;
