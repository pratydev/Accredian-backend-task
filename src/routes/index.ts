import {Router} from "express";
import referralRoutes from "./referral";

const router = Router();

router.use('/referral', referralRoutes);

export default router;
