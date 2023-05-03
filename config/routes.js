const router = require("express").Router();

const { carController, authController } = require("../app/controllers/api/v1");

const controllers = require("../app/controllers");
const middlewares = require("../app/middlewares");

const {
  authorize,
  isAdmin,
  isSuperAdmin,
} = require("../app/middlewares/authMiddleware");

const {
  carMiddleware,
  cloudinaryMiddleware,
  imgUploaderMiddleware,
} = require("../app/middlewares");

// const { ACCESS_CONTROL } = require("../config/application");

const prefixApi = "/api/v1/cars";

router.get("/", (req, res) => {
  res.json({ msg: "Hello World" });
});
router.get("/favicon.ico", (req, res) => res.status(204));
router.get("/api/v1/cars", carController.getAllCar);
router.get("/api/v1/cars/:id", carMiddleware.checkCar, carController.getCar);
router.post(
  "/api/v1/cars",
  authorize,
  isAdmin,
  imgUploaderMiddleware,
  cloudinaryMiddleware.cloudinaryUpload,
  carController.createCar
);
router.delete(
  "/api/v1/cars/:id",
  authorize,
  isAdmin,
  carMiddleware.checkCar,
  carController.deleteCar
);
router.put(
  "/api/v1/cars/:id",
  authorize,
  isAdmin,
  carMiddleware.checkCar,
  imgUploaderMiddleware,
  cloudinaryMiddleware.cloudinaryUpload,
  carController.updateCar
);

router.post("/api/v1/login", authController.login);
router.post("/api/v1/register", authController.register);
router.post(
  "/api/v1/registeradmin",
  authorize,
  isSuperAdmin,
  authController.registerAdmin
);

// router.get("/whoami", controllers.api.v1.authController.whoAmI);
// router.post(
//   "/registerAdmin",
//   controllers.api.v1.authController.authorize(ACCESS_CONTROL.SUPERADMIN)
// );

// router.post(`${prefixApi}/register`, controllers.api.v1.authController.register);
// router.post(`${prefixApi}/login`, controllers.api.v1.authController.login);
// router.post(
//   prefixApi,
//   controllers.api.v1.authController.authorize,
//   controllers.api.v1.authController.login
// );

module.exports = router;
