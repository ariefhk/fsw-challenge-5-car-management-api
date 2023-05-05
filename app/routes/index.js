const router = require("express").Router();

// import routes
const auth = require("./authRoute");
const cars = require("./carRoute");
const docs = require("./docRoute");
const prefix = "/api/v1"; //versioning API

// Routes
router.use(`${prefix}/auth`, auth);
router.use(`${prefix}/cars`, cars);
router.use(`${prefix}/docs`, docs);

module.exports = router;
