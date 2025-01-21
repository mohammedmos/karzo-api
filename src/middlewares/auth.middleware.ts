import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    req.body.auth_id = jwt.verify(token, 'this-is-kar') as { id: number };
    next();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default auth;
