const router = require("express").Router();
const carController = require("../controllers/api/v1/carController");
const { authorize, isAdmin } = require("../../app/middlewares/authMiddleware");
const {
  carMiddleware,
  cloudinaryMiddleware,
  imgUploaderMiddleware,
} = require("../middlewares");

router.get("/", carController.getAllCar);
router.get("/:id", carMiddleware.checkCar, carController.getCar);
router.post(
  "/",
  authorize,
  isAdmin,
  imgUploaderMiddleware,
  cloudinaryMiddleware.cloudinaryUpload,
  carController.createCar
);
router.delete(
  "/:id",
  authorize,
  isAdmin,
  carMiddleware.checkCar,
  carController.deleteCar
);
router.put(
  "/:id",
  authorize,
  isAdmin,
  carMiddleware.checkCar,
  imgUploaderMiddleware,
  cloudinaryMiddleware.cloudinaryUpload,
  carController.updateCar
);

module.exports = router;
