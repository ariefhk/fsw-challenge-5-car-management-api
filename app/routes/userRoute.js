const router = require("express").Router();
const userController = require("../controllers/api/v1/userController");
const { authorize, isSuperAdmin } = require("../middlewares/userMiddleware");

router.get("/me", authorize, userController.whoAmI);
router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/users", authorize, isSuperAdmin, userController.getAllUser);
router.post(
  "/admin/register",
  authorize,
  isSuperAdmin,
  userController.registerAdmin
);
router.delete(
  "/delete/:id",
  authorize,
  isSuperAdmin,
  userController.deleteUser
);

module.exports = router;
