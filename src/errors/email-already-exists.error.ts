import { BaseError } from "./base.error";

export class EmailAlreadyExistsError extends BaseError {
    constructor(message = "O email infomado já está sendo utilizado por outra conta!") {
        super(409, message);
    }
}