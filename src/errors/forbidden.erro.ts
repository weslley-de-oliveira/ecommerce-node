import { ErrorBase } from "./error-base";

export class ForbiddenError extends ErrorBase {
  constructor(message = "Não autorizado.") {
    super(403, message);
  }
}
