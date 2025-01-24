import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserInfo {
  username: string;
  firstName: string;
  lastname: string;
  email: string;
  id: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user: UserInfo;
    }
  }
}

const confirmUser = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.session!.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session!.jwt,
      process.env.JWT_KEY!
    ) as UserInfo;
    req.user = payload;
  } catch (error) {
    console.log(error);
  }
  next();
};

export default confirmUser;
