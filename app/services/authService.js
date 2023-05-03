const { authRepository } = require("../repositories");
const { JWT_SIGNATURE_KEY } = require("../../config/application");
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
    return await authRepository.find(tokenPayload.id);
  } catch (error) {
    console.log(error);
    throw new Error("Unauthorized");
  }
};

exports.register = async (name, email, password) => {
  try {
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
  } catch (error) {
    throw new Error("Unauthorized");
  }
};

exports.login = async (email, password) => {
  const user = await authRepository.findByEmail(email.toLowerCase());
  if (!user) {
    throw new Error("Email tidak ditemukan!");
  }

  const isPasswordCorrect = await checkPassword(
    user.encryptedPassword,
    password
  );

  if (!isPasswordCorrect) {
    throw new Error("Password Salah!");
  }

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
  try {
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
  } catch (error) {
    throw new Error("Unauthorized");
  }
};
