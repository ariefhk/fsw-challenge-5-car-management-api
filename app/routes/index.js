const router = require("express").Router();

// Import routes
const user = require("./userRoute");
const cars = require("./carRoute");
const docs = require("./docRoute");
const prefix = "/api/v1"; //versioning API

// Routes
router.use(`${prefix}/users`, user);
router.use(`${prefix}/cars`, cars);
router.use(`${prefix}/docs`, docs);

// Handling Error route not found
router.use((req, res) => {
  res.status(404).json({
    status: "FAIL",
    message: "Route not found!",
  });
});

module.exports = router;
