const { userRepository } = require("../repositories");
const {
  JWT_SIGNATURE_KEY,
  ACCESS_CONTROL,
} = require("../../config/application");
const ApplicationError = require("../errors/ApplicationError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT = 10;

const encryptPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT, (error, encryptedPassword) => {
      if (!!error) {
        reject(error);
        return;
      }
      resolve(encryptedPassword);
    });
  });
};

const checkPassword = (encryptPassword, password) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encryptPassword, (error, isPasswordCorrect) => {
      if (!!error) {
        reject(error);
        return;
      }
      resolve(isPasswordCorrect);
    });
  });
};

const createToken = (payload) => {
  return jwt.sign(payload, JWT_SIGNATURE_KEY);
};

const decodeToken = (token) => {
  return jwt.verify(token, JWT_SIGNATURE_KEY);
};

exports.authorize = async (bearerToken) => {
  try {
    const token = bearerToken.split("Bearer ")[1];
    const tokenPayload = decodeToken(token);
    return await userRepository.find(tokenPayload.id);
  } catch (error) {
    throw new ApplicationError(498, "invalid token");
  }
};

exports.register = async (name, email, password) => {
  if (!name) throw new ApplicationError(400, `name can't be empty!`);
  if (!email) throw new ApplicationError(400, `email can't be empty!`);
  if (!password) throw new ApplicationError(400, `password can't be empty!`);

  const existingUser = await userRepository.findByEmail(email.toLowerCase());
  if (!!existingUser)
    throw new ApplicationError(
      409,
      `user with email : ${email} already taken!`
    );

  const passswordLength = password.length >= 8;
  if (!passswordLength)
    throw new ApplicationError(
      400,
      `minimum password length must be 8 character or more!`
    );

  const encryptedPassword = await encryptPassword(password);
  const user = await userRepository.create({
    name,
    email,
    encryptedPassword,
    role: ACCESS_CONTROL.MEMBER,
  });
  return {
    name: user.name,
    email: user.email,
  };
};

exports.login = async (email, password) => {
  if (!email) throw new ApplicationError(400, `email can't be empty!`);
  if (!password) throw new ApplicationError(400, `password can't be empty!`);

  const user = await userRepository.findByEmail(email.toLowerCase());
  if (!user) throw new ApplicationError(404, `user not found!`);

  const isPasswordCorrect = await checkPassword(
    user.encryptedPassword,
    password
  );
  if (!isPasswordCorrect) throw new ApplicationError(400, `wrong password!`);

  const token = createToken({
    id: user.id,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });

  return {
    name: user.name,
    email: user.email,
    token,
  };
};

exports.getAllUser = async () => {
  try {
    const payload = await userRepository.getAllUser();
    // Super Admin can't be searched
    const userPayload =
      (await payload.length) < 1
        ? []
        : payload.filter((user) => user.role !== ACCESS_CONTROL.SUPERADMIN);

    return userPayload;
  } catch (error) {
    throw new ApplicationError(500, "failed get user!");
  }
};

exports.deleteUser = async (id) => {
  try {
    return await userRepository.delete(id);
  } catch (error) {
    throw new ApplicationError(500, "failed delete user!");
  }
};

exports.registerAdmin = async (name, email, password) => {
  if (!name) throw new ApplicationError(400, `name can't be empty!`);
  if (!email) throw new ApplicationError(400, `email can't be empty!`);
  if (!password) throw new ApplicationError(400, `password can't be empty!`);

  const existingUser = await userRepository.findByEmail(email.toLowerCase());
  if (!!existingUser)
    throw new ApplicationError(
      409,
      `user with email : ${email} already taken!`
    );

  const passswordLength = password.length >= 8;
  if (!passswordLength)
    throw new ApplicationError(
      400,
      `minimum password must be 8 character or more!`
    );
  const encryptedPassword = await encryptPassword(password);

  const user = await userRepository.create({
    name,
    email,
    encryptedPassword,
    role: ACCESS_CONTROL.ADMIN,
  });
  return {
    name: user.name,
    email: user.email,
  };
};
