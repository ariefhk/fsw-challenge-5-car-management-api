const { authRepository } = require("../repositories");
const { JWT_SIGNATURE_KEY } = require("../../config/application");
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
  const token = bearerToken.split("Bearer ")[1];
  const tokenPayload = decodeToken(token);
  return await authRepository.find(tokenPayload.id);
};

exports.register = async (name, email, password) => {
  if (!name) throw new ApplicationError(400, `name can't be empty!`);
  if (!email) throw new ApplicationError(400, `email can't be empty!`);
  if (!password) throw new ApplicationError(400, `password can't be empty!`);

  const existingUser = authRepository.findByEmail(email.toLowerCase());
  if (!!existingUser)
    throw new Error(`user with email : ${email} already taken!`);

  const passswordLength = password.length >= 8;
  if (!passswordLength)
    throw new ApplicationError(400, `minimum password must be 8 or more!`);

  const encryptedPassword = await encryptPassword(password);
  const role = await authRepository.findMemberRole();
  const user = await authRepository.create({
    name,
    email,
    encryptedPassword,
    roleId: role.id,
  });
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

exports.login = async (email, password) => {
  if (!email) throw new ApplicationError(400, `email can't be empty!`);
  if (!password) throw new ApplicationError(400, `password can't be empty!`);

  const user = await authRepository.findByEmail(email.toLowerCase());
  if (!user) throw new ApplicationError(404, `user not found!`);

  const isPasswordCorrect = await checkPassword(
    user.encryptedPassword,
    password
  );
  if (!isPasswordCorrect) throw new ApplicationError(400, `wrong password!`);

  const token = createToken({
    id: user.id,
    email: user.email,
    role: user.Role.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });

  return {
    id: user.id,
    email: user.email,
    token,
    role: user.Role.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

exports.registerAdmin = async (name, email, password) => {
  const encryptedPassword = await encryptPassword(password);
  const role = await authRepository.findAdminRole();

  const user = await authRepository.create({
    name,
    email,
    encryptedPassword,
    roleId: role.id,
  });
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
