import {Router, Request, Response} from "express";
import referralRoutes from "./referral";

const router = Router();

router.get('/', (req:Request, res:Response) => {
    return res.status(200).json({
        message: 'Welcome to the Accredian Backend Task API'
    });
});

router.use('/referral', referralRoutes);

export default router;
