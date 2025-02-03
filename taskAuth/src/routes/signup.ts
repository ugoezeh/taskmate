import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError, userInputValidation } from '@taskmate/shared';

import User from '../models/user';

const createProfile = (): Router => {
  const createProfileRouter = Router();

  createProfileRouter.post(
    '/',
    [
      body('username')
        .notEmpty()
        .isLength({ min: 3, max: 40 })
        .withMessage('Your username must be between 3 to 40 characters'),
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
      const { username, email, password, role } = req.body;

      const userAlreadyExists = await User.findOne({ email });

      if (userAlreadyExists) {
        throw new BadRequestError('The email address is already in use.');
      }

      interface UserToBeCreatedInterface {
        username: string;
        email: string;
        password: string;
        role?: string;
      }

      const userToBeCreated: UserToBeCreatedInterface = {
        username,
        email,
        password,
      };

      if ((req.user && req.user.role === 'admin') || role === 'user') {
        userToBeCreated.role = role;
      }

      const user = User.createNewUser({
        ...userToBeCreated,
      });

      await user.save();

      //TODO-1: Genrate a json web token for the user
      const userJwtToken = jwt.sign(
        {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET!
      );

      //TODO-2: Store it on the session object

      req.session = {
        jwt: userJwtToken,
      };

      res.status(201).json(user);
    }
  );

  return createProfileRouter;
};

export default createProfile;
