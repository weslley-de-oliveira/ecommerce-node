import { Joi } from "celebrate"

export interface UserI {
    id?: string,
    nome: string,
    email: string,
    password?: string
}

export const createUserSchema = Joi.object().keys({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

export const updateUserSchema = Joi.object().keys({
    nome: Joi.string().required(),
    email: Joi.string().email().required()
});

export const authLoginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});