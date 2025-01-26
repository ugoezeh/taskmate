import { Request, Response, Router } from 'express';

const getUserProfile = (): Router => {
  const getUserProfileRouter = Router();

  getUserProfileRouter.get('/', (req: Request, res: Response) => {
    res.status(200).json({ currentUser: req.user || null });
  });

  return getUserProfileRouter;
};

export default getUserProfile;
