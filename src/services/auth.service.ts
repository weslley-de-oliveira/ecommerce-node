import { getAuth, UserRecord } from "firebase-admin/auth";
import { User } from "../models/user.model";

export class AuthService {
  async create(user: User): Promise<UserRecord> {
    return getAuth().createUser({
      email: user.email,
      password: user.senha,
      displayName: user.nome
    });
  }
}
