import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';

export const checkAuth = async(req: Request, res: Response, next: NextFunction) => {
    const authorizationToken = req.header('authorization');
    if(!authorizationToken){
        res.status(403).json({
            errors: ['unauthorized user'],
            data: null
        });
    }
    else{
        const token = authorizationToken.split(' ')[1];
        try{
            const user = JWT.verify(token, process.env.JWT_SECRET as string) as { email: string };
            if(user.email){
                req.user = user.email;
                next();
            }
            else{
                throw new Error('User not found')
            }
        }
        catch(err){
            res.status(403).json({
                errors: ['unauthorized user'],
                data: null
            });
        }
    }
}