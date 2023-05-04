const router = require("express").Router();
const authController = require("../controllers/api/v1/authController");

const { authorize } = require("../../app/middlewares/authMiddleware");

router.get("/", authorize, authController.whoAmI);

module.exports = router;
