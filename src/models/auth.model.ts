import { Joi } from "celebrate";

export type AuthT = {
  email: string;
  senha: string;
};

export const authSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required()
});

export const authRecoverySchema = Joi.object().keys({
  email: Joi.string().email().required()
});
