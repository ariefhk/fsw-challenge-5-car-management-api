const router = require("express").Router();
const authController = require("../controllers/api/v1/authController");
const {
  authorize,
  isSuperAdmin,
  isAdmin,
} = require("../../app/middlewares/authMiddleware");

router.post("/login", authController.login);
router.post("/register", authorize, isAdmin, authController.register);
router.post(
  "/registeradmin",
  authorize,
  isSuperAdmin,
  authController.registerAdmin
);

module.exports = router;
