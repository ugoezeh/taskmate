import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError, userInputValidation } from '@taskmate/shared';

import User from '../models/user';
import Password from '../services/password';

const signinToProfile = (): Router => {
  const signinRouter: Router = Router();

  signinRouter.post(
    '/',
    [
      body('email')
        .isEmail()
        .withMessage('Enter a valid email address to continue'),
      body('password')
        .trim()
        .isLength({ min: 5, max: 100 })
        .withMessage('Password must be between 5 and 100 characters'),
    ],
    userInputValidation,
    async (req: Request, res: Response) => {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        throw new BadRequestError(
          'Invalid email entered, check your email and try again'
        );
      }

      const comparePassword = await Password.comparePassword(
        user.password,
        password
      );

      if (!comparePassword) {
        throw new BadRequestError('Invalid password entered');
      }

      const userJwtToken = jwt.sign(
        {
          username: user.username,
          email: user.email,
          id: user._id,
          role: user.role,
        },
        process.env.JWT_SECRET!
      );

      req.session = {
        jwt: userJwtToken,
      };

      res.status(200).json(user);
    }
  );

  return signinRouter;
};

export default signinToProfile;
