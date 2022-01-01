import { Request, Response } from "express";

export const setCsrfToken = (req: Request, res: Response) => {
  const csrfToken = req.csrfToken();

  return res.status(200).send({ csrfToken });
};
