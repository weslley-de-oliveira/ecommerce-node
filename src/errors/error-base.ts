import { Response } from "express";

export class ErrorBase extends Error {
  constructor(
    private status: number,
    message: string,
  ) {
    super(message);

    this.name = new.target.name;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  send(res: Response) {
    res.status(this.status).send({
      message: this.message,
    });
  }
}
