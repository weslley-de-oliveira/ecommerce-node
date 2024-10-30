import { FirebaseAuthErrorsEnum } from "../enums/firebase-auth.erros.enum";
import { EmailAlreadyExistsError } from "../errors/email-already-exists.error";
import { UserI } from "../models/user.model";
import { FirebaseAuthError, getAuth, UpdateRequest, UserRecord } from "firebase-admin/auth"
import { getAuth as getFirebaseAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { TooManyRequestsError } from "../errors/too-many-requests.error";

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

    async update(id: string, user: UserI): Promise<void> {
        const props: UpdateRequest = {
            displayName: user.nome,
            email: user.email
        }; 

        if (user.password) {
            props.password = user.password;
        }

        await getAuth().updateUser(id, props);
    }

    async login(email: string, password: string): Promise<UserCredential> {
            return await signInWithEmailAndPassword(getFirebaseAuth(), email, password)
            .catch (error => {
                if (error.code === FirebaseAuthErrorsEnum.INVALID_CREDENTIAL) {
                    throw new UnauthorizedError();
                }

                if (error.code === FirebaseAuthErrorsEnum.TOO_MANY_REQUESTS) {
                    throw new TooManyRequestsError();
                }

                throw error;
            })
    }
}