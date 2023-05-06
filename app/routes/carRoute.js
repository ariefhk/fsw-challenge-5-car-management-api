const router = require("express").Router();
const carController = require("../controllers/api/v1/carController");
const { authorize, isAdmin } = require("../middlewares/userMiddleware");
const { checkCar } = require("../middlewares/carMiddleware");
const { cloudinaryUpload } = require("../middlewares/cloudinaryMiddleware");
const { imgUploader } = require("../middlewares/imgUploaderMiddleware");

router.get("/", authorize, carController.getAllCar);
router.get("/detail", authorize, isAdmin, carController.getDetailAllCar);
router.get("/:id", authorize, checkCar, carController.getCar);
router.get("/detail/:id", authorize, isAdmin, carController.getDetailCar);
router.post(
  "/",
  authorize,
  isAdmin,
  imgUploader,
  cloudinaryUpload,
  carController.createCar
);
router.delete("/:id", authorize, isAdmin, checkCar, carController.deleteCar);
router.put(
  "/:id",
  authorize,
  isAdmin,
  checkCar,
  imgUploader,
  cloudinaryUpload,
  carController.updateCar
);

module.exports = router;
