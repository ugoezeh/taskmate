import { Router, Request, Response } from 'express';

const signoutOfProfile = (): Router => {
  const signoutOfProfileRouter = Router();

  signoutOfProfileRouter.post('/', async (req: Request, res: Response) => {
    req.session = null;

    res.status(200).json({ currentUser: null });
  });

  return signoutOfProfileRouter;
};

export default signoutOfProfile;
