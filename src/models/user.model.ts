import { Joi } from "celebrate";

export type User = {
  id: string;
  nome: string;
  email: string;
  senha?: string;
};

export const userSchema = Joi.object().keys({
  nome: Joi.string().required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required()
});
