import { Router } from "express";
import { handleReferralSubmission } from "../controllers/referralController";

const referralRoutes = Router();


referralRoutes.post('/create-referral', handleReferralSubmission);


export default referralRoutes;

