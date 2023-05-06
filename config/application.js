require("dotenv").config();

module.exports = {
  MORGAN_FORMAT:
    ":remote-user [:date[clf]]  :method :url :status :res[content-length] - :response-time ms",
  JWT_SIGNATURE_KEY: process.env.JWT_SIGNATURE_KEY || "Rahasia",
  ACCESS_CONTROL: {
    SUPERADMIN: "Super Admin",
    ADMIN: "Admin",
    MEMBER: "Member",
  },
  CLOUDINARY_FOLDER: "hehe",
};
