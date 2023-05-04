const router = require("express").Router();

// import routes
const auth = require("./authRoute");
const cars = require("./carRoute");
const prefix = "/api/v1"; //versioning API
// const docs = require("./docs");

// Routes
router.use(`${prefix}/auth`, auth);
router.use(`${prefix}/cars`, cars);
// router.use(`${prefix}/docs`, docs);

module.exports = router;
