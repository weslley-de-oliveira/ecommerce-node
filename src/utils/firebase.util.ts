import { FirebaseErrorsEnum } from "../enums/firebase-error.enum";
import { FirebaseError } from "../errors/firebase.error";
import { ErrorT } from "../models/error.model";

export const firebaseError: Record<FirebaseErrorsEnum, ErrorT> = {
  [FirebaseErrorsEnum.EMAIL_EXISTENTE]: {
    status: 409,
    message: "Já existe um usuário cadastrado com este e-mail."
  },
  [FirebaseErrorsEnum.EMAIL_OU_SENHA_INVALIDA]: {
    status: 401,
    message: "E-mail ou senha inválida. Por favor, revise os campos."
  }
};

export function throwFireBaseError(code: FirebaseErrorsEnum) {
  const error = firebaseError[code];
  throw new FirebaseError(error.status, error.message);
}
