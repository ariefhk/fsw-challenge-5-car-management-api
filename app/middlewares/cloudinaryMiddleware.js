const { cloudinaryService } = require("../services");

exports.cloudinaryUpload = async (req, res, next) => {
  try {
    if (req.car?.id) {
      // skipping while empty file input
      if (!req.file) {
        next();
        return;
      }
      await cloudinaryService.delete(req.car.image);
    }

    const fileBase64 = req.file.buffer.toString("base64"); //convert buffer to base64
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;
    const imgPayload = await cloudinaryService.upload(file);
    req.image = imgPayload.secure_url; //generated url
    next();
  } catch (error) {
    res.status(400).json({
      status: "FAIL",
      message: `can't upload image!`,
    });
  }
};

exports.cloudinaryDelete = async (req, res, next) => {
  try {
    await cloudinaryService.delete(req.car.image);
    next();
  } catch (error) {
    res.status(400).json({
      status: "FAIL",
      message: `can't delete image!`,
    });
  }
};
