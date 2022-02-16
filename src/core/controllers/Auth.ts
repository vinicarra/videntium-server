import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { JsonWebTokenError } from "jsonwebtoken";
import * as firebase from "firebase-admin";
import casual from "casual";

const secret = process.env.JWT_SECRET!;

const email = "fake_email@fake.com";
const password = "pass123";

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

  public static async fakeUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const auth = firebase.auth();
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: casual.name,
    });
    return res.send(userRecord);
  }

  public static async fakeLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const auth = firebase.auth();
    // const userRecord = auth.verifyIdToken();
    return res.send("userRecord");
  }
}
