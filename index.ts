import * as admin from "firebase-admin";
import express from "express"

export const validateToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const header = req.headers.authorization;
  if (!header) {
    res.status(401).send({
      code: "authorization_header_missing",
      description: "Authorization header is expected",
    });
    return;
  }

  const parts = header.split(" ");

  if (parts[0].toLocaleLowerCase() != "bearer") {
    res.status(401);
    res.send({
      code: "invalid_header",
      description: 'Authorization header must start with "Bearer"',
    });
    return;
  }

  if (parts.length == 1) {
    res.status(401);
    res.send({
      code: "invalid_header",
      description: "Token not found",
    });
  }

  if (parts.length > 2) {
    res.status(401);
    res.send({
      code: "invalid_header",
      description: 'Authorization header must be "Bearer TOKEN"',
    });
    return;
  }

  const token = parts[1];

  admin.auth()
    .verifyIdToken(token)
    .then((user) => {
      (req as any).user = user;
      next();
    })
    .catch(() => {
      res.status(401);
      res.send({
        code: "invalid_header",
        description: "Validation of token failed.",
      });
    });
}
