import { BaseError } from "./base.error";

export class TooManyRequestsError extends BaseError {
    constructor(message = "Acesso a esta conta foi temporariamente desativado devido a várias tentativas de login sem sucesso. Você pode restaurá-la imediatamente redefinindo sua senha ou tentar novamente mais tarde.") {
        super(429, message);
    }
}