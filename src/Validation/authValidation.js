import Joi from "joi";

const registerUser = {
  body: Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    address : Joi.string().required(),
    phone_no: Joi.string().required(),
  }),
};

const loginUser = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
export const user = {
  registerUser,
  loginUser,
};