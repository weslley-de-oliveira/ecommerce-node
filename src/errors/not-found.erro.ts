import { ErrorBase } from "./error-base";

export class NotFoundError extends ErrorBase {
  constructor(message = "Usuário não encontrado") {
    super(404, message);
  }
}
