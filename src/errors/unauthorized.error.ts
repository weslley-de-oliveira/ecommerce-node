import { BaseError } from "./base.error";

export class UnauthorizedError extends BaseError {
    constructor(message = "Usuário não autorizado!") {
        super(401, message);
    }
}