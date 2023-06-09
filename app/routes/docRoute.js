const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../docs/openapi.json");

// Router for swagger UI
router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocument));

module.exports = router;
