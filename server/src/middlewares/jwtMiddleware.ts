import {Request} from 'express';

import jwt from "express-jwt";

const createJwtConfig = (): jwt.RequestHandler => {
  return jwt({
    secret: process.env.JWT_KEY!,
    algorithms: ["HS256"],
    getToken: (req: Request) => req.cookies[process.env.JWT_KEY_NAME!],
  })
}

export default createJwtConfig;