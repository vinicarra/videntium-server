import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { Logger } from "../utils/Logger";
import { JsonWebTokenError } from "jsonwebtoken";

const secret = process.env.JWT_SECRET!;

export class AuthController {
  public static authorize(req: Request, res: Response, next: NextFunction) {
    const token = jwt.sign({ sub: 1 }, secret, { expiresIn: "5m" });
    return res.send(token);
  }

  public static refresh(req: Request, res: Response, next: NextFunction) {
    if (req.body?.token) {
      const token = req.body.token;
      try {
        const decoded = jwt.verify(token, secret);
        return res.send(decoded);
      } catch (err) {
        const error = err as JsonWebTokenError;
        return res.send(error.message);
      }
    }
    return res.send("Invalid token");
  }
}
