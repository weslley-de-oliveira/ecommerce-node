import { BaseError } from "./base.error";

export class InternalServerError extends BaseError {
    constructor(message = "Erro interno do servidor!") {
        super(500, message);
    }
}