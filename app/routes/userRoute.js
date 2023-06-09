const router = require("express").Router();
const userController = require("../controllers/api/v1/userController");
const {
  authorize,
  isSuperAdmin,
  isAdmin,
} = require("../middlewares/userMiddleware");

router.get("/me", authorize, userController.whoAmI);
router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/admin/all", authorize, isAdmin, userController.getAllUser);
router.post(
  "/admin/register",
  authorize,
  isSuperAdmin,
  userController.registerAdmin
);

module.exports = router;
