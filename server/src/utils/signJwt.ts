import jsonwebtoken, { Secret } from "jsonwebtoken";

export const signJwt = (email: string): Secret => {
  return jsonwebtoken.sign(
    {
      email: email,
    },
    process.env.JWT_KEY!
  );
};
