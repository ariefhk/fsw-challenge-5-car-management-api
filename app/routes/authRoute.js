const router = require("express").Router();
const authController = require("../controllers/api/v1/authController");
const {
  authorize,
  isSuperAdmin,
} = require("../../app/middlewares/authMiddleware");

router.get("/me", authorize, authController.whoAmI);
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post(
  "/registeradmin",
  authorize,
  isSuperAdmin,
  authController.registerAdmin
);

module.exports = router;
