import { ErrorBase } from "./error-base";

export class UnauthorizedError extends ErrorBase {
  constructor(message = "Não autorizado.") {
    super(401, message);
  }
}
