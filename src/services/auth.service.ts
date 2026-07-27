import {
  FirebaseAuthError,
  getAuth as getFirebaseAdminAuth,
  UpdateRequest,
  UserRecord
} from "firebase-admin/auth";
import {
  getAuth as getFirebaseAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  UserCredential
} from "firebase/auth";
import { User } from "../models/user.model";
import { throwFireBaseError } from "../utils/firebase.util";
import { FirebaseErrorsEnum } from "../enums/firebase-error.enum";
import { AuthT } from "../models/auth.model";
import { FirebaseError } from "firebase/app";

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

  async update(id: string, user: User) {
    const props: UpdateRequest = {
      displayName: user.nome,
      email: user.email
    };

    if (user.senha) {
      props.password = user.senha;
    }

    await getFirebaseAdminAuth().updateUser(id, props);
  }

  async delete(id: string) {
    return getFirebaseAdminAuth().deleteUser(id);
  }

  async login(auth: AuthT): Promise<UserCredential> {
    return signInWithEmailAndPassword(
      getFirebaseAuth(),
      auth.email,
      auth.senha
    ).catch((error) => {
      if (error instanceof FirebaseError) {
        throwFireBaseError(error.code as FirebaseErrorsEnum);
      }

      throw error;
    });
  }

  async recovery(email: string) {
    return sendPasswordResetEmail(getFirebaseAuth(), email).catch((error) => {
      if (error instanceof FirebaseError) {
        throwFireBaseError(error.code as FirebaseErrorsEnum);
      }

      throw error;
    });
  }
}
