import { EmailAlreadyExistsError } from "../errors/email-already-exists.error";
import { UserI } from "../models/user.model";
import { getAuth, UserRecord } from "firebase-admin/auth"

export class AuthService {
    create(user: UserI): Promise<UserRecord> {
        return getAuth().createUser({
            email: user.email,
            password: user.password,
            displayName: user.nome
        }).catch((error) => {
            if (error.code === 'auth/email-already-exists') {
                throw new EmailAlreadyExistsError();
            }

            throw error;
        })
    }
}