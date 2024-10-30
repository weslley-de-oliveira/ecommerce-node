import { BaseError } from "./base.error";

export class ForbiddenError extends BaseError {
    constructor(message = "Não autorizado!") {
        super(403, message);
    }
}