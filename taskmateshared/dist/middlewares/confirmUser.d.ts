import { Request, Response, NextFunction } from 'express';
interface UserInfo {
    username: string;
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
export declare const confirmUser: (req: Request, res: Response, next: NextFunction) => void;
export {};
