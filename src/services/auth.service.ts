import {
  FirebaseAuthError,
  getAuth as getFirebaseAdminAuth,
  UserRecord
} from "firebase-admin/auth";
import {
  getAuth as getFirebaseAuth,
  signInWithEmailAndPassword,
  UserCredential
} from "firebase/auth";
import { User } from "../models/user.model";
import { throwFireBaseError } from "../utils/firebase.util";
import { FirebaseErrorsEnum } from "../enums/firebase-error.enum";

export class AuthService {
  async create(user: User): Promise<UserRecord> {
    return getFirebaseAdminAuth()
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

  async login(email: string, senha: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(getFirebaseAuth(), email, senha);
  }
}
