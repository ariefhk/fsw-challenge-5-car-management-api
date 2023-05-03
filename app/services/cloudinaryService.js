const cloudinary = require("../../config/cloudinary");
const { CLOUDINARY_FOLDER } = require("../../config/application");

const getPublicId = (imageURL) => {
  if (!imageURL) return "";

  const CLOUDINARY_REGEX =
    /^.+\.cloudinary\.com\/(?:[^\/]+\/)(?:(image|video|raw)\/)?(?:(upload|fetch|private|authenticated|sprite|facebook|twitter|youtube|vimeo)\/)?(?:(?:[^_/]+_[^,/]+,?)*\/)?(?:v(\d+|\w{1,2})\/)?([^\.^\s]+)(?:\.(.+))?$/;

  const parts = CLOUDINARY_REGEX.exec(imageURL);

  return parts && parts.length > 2 ? parts[parts.length - 2] : imageURL;
};

exports.delete = async (image) => {
  try {
    const public_id = getPublicId(image);
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.log(error);
  }
};

exports.upload = async (file) => {
  try {
    return await cloudinary.uploader.upload(file, {
      folder: CLOUDINARY_FOLDER,
    });
  } catch (error) {
    console.log(error);
  }
};
