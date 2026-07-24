import { ErrorBase } from "./error-base";

export class ValidationError extends ErrorBase {
  constructor(message: string) {
    super(400, message);
  }
}
