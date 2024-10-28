import { FirebaseAuthErrorsEnum } from "../enums/firebase-auth.erros.enum";
import { EmailAlreadyExistsError } from "../errors/email-already-exists.error";
import { UserI } from "../models/user.model";
import { FirebaseAuthError, getAuth, UserRecord } from "firebase-admin/auth"
import { getAuth as getFirebaseAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth";

export class AuthService {
    async create(user: UserI): Promise<UserRecord> {
        try {
            return getAuth().createUser({
            email: user.email,
            password: user.password,
            displayName: user.nome
        })
        }
        catch(error) {
            if (error instanceof FirebaseAuthError && error.code === FirebaseAuthErrorsEnum.EMAIL_ALREALDY_EXISTS) {
                throw new EmailAlreadyExistsError();
            }

            throw error;
        };
    }

    async login(email: string, password: string): Promise<UserCredential> {
        return signInWithEmailAndPassword(getFirebaseAuth(), email, password);
    }
}