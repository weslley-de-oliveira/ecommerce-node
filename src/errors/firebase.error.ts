import { ErrorBase } from "./error-base";

export class FirebaseError extends ErrorBase {
  constructor(status: number, message: string) {
    super(status, message);
  }
}
