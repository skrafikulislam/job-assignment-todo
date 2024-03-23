import jwt from "jsonwebtoken";

export const createSecretToken = (id) => {
  return jwt.sign({ id }, "secret", {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
