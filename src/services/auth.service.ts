import { FirebaseAuthError, getAuth, UserRecord } from "firebase-admin/auth";
import { User } from "../models/user.model";
import { throwFireBaseError } from "../utils/firebase.util";
import { FirebaseErrorsEnum } from "../enums/firebase-error.enum";

export class AuthService {
  async create(user: User): Promise<UserRecord> {
    return getAuth()
      .createUser({
        email: user.email,
        password: user.senha,
        displayName: user.nome
      })
      .catch((error) => {
        if (error instanceof FirebaseAuthError) {
          throwFireBaseError(error.code as FirebaseErrorsEnum);
        }

        throw error;
      });
  }
}
