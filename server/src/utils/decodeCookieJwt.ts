import {Request} from 'express';

import jsonwebtoken from "jsonwebtoken";

type DecodeCookie = {
  req: Request,
  target: "email"
}

export const decodeCookieJwt = (props: DecodeCookie): jsonwebtoken.JwtPayload | null => {
  const token = props.req.cookies[process.env.JWT_KEY_NAME!];
  const decode = jsonwebtoken.decode(token) as jsonwebtoken.JwtPayload | null;
  if (!decode || !decode[props.target]) {
    return null
  }
  return decode
}