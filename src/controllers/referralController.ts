import { Request, Response } from "express";
import zod from 'zod';
import { prisma } from "..";
import { successReferrer, successReferred } from "../mailer/referralMail";

const nameSchema = zod.string().min(3, 'Name cannot be shorter than 3 characters').max(40, 'Name cannot be longer than 40 characters');
const emailSchema = zod.string().email();
const phoneSchema = zod.string().min(10, 'Phone Number cannot be shorter than 10 digits').max(12, 'Phone Number cannot exceed 12 digits');

const referralSchema = zod.object({
    referrerName: nameSchema,
    referrerEmail: emailSchema,
    referrerPhoneNumber: phoneSchema,
    referredName: nameSchema,
    referredEmail: emailSchema,
    referredPhoneNumber: phoneSchema,
    preferredCourse: zod.string()
});

function generateReferralCode() {
    const min = 100000;
    const max = 999999;

    const referralCode = Math.floor(Math.random() * (max - min + 1)) + min;

    return referralCode;
}


export const handleReferralSubmission = async function (req: Request, res: Response) {
    try {
        const { success, error, data } = referralSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).json({
                message: 'Error in form submission',
                data: {
                    error: error.errors[0].message
                }
            })
        }

        const { referrerEmail, referrerPhoneNumber, referredEmail, referredPhoneNumber, preferredCourse } = req.body;

        const referrer = await prisma.user.findUnique({
            where: {
                email: referrerEmail,
                phoneNumber: referrerPhoneNumber
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        if (!referrer) {
            return res.status(400).json({
                message: 'Invalid Referrer User'
            })
        }

        const referred = await prisma.user.findUnique({
            where: {
                email: referredEmail,
                phoneNumber: referredPhoneNumber
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        if (!referred) {
            return res.status(400).json({
                message: 'Invalid Referred User'
            });
        }

        const referralCode = generateReferralCode();

        const referral = await prisma.referral.create({
            data: {
                referrerId: referrer.id,
                referredUserId: referred.id,
                referralCode,
                preferredCourse
            }
        });

        successReferrer(referrer, referred, {preferredCourse, referralCode});

        return res.status(200).json({
            message: 'Referral Successful',
            data: {
                referralCode
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error in creating referral'
        });
    }
}