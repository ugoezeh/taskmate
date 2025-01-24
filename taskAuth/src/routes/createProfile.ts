import { Router, Request, Response } from 'express';
import { body } from 'express-validator';

import User from '../models/user';
import BadRequestError from '../errors/BadRequestError';
import userInputValidation from '../middlewares/userInputValidation';

const createProfile = (): Router => {
  const createProfileRouter = Router();

  createProfileRouter.post(
    '/',
    [
      body('username')
        .notEmpty()
        .isLength({ min: 3, max: 40 })
        .withMessage('Your username must be between 3 to 40 characters'),
      body('firstName')
        .notEmpty()
        .isLength({ min: 2, max: 40 })
        .withMessage('Your firstname must not be empty'),
      body('lastName')
        .notEmpty()
        .isLength({ min: 2, max: 40 })
        .withMessage('Your lastname must not be empty'),
      body('email').isEmail().withMessage('Enter a valid email to continue'),
      body('password')
        .trim()
        .isLength({ min: 5, max: 100 })
        .withMessage('Password must be between 5 and 100 characters'),
    ],
    userInputValidation,
    async (req: Request, res: Response) => {
      const { username, firstName, lastName, email, password, role } = req.body;

      const userAlreadyExists = await User.findOne({ email });

      if (userAlreadyExists) {
        throw new BadRequestError('The email address is already in use.');
      }

      const user = User.createNewUser({
        username,
        firstName,
        lastName,
        email,
        password,
      });

      await user.save();

      res.status(201).json(user);
    }
  );

  return createProfileRouter;
};

export default createProfile;
