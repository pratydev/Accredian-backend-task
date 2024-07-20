import { Request, Response } from "express";
import zod from 'zod';
import { prisma } from "..";
import { successReferrer, successReferee } from "../mailer/referralMail";

const nameSchema = zod.string().min(3, 'Name cannot be shorter than 3 characters').max(40, 'Name cannot be longer than 40 characters');
const emailSchema = zod.string().email();
const phoneSchema = zod.string().min(10, 'Phone Number cannot be shorter than 10 digits').max(12, 'Phone Number cannot exceed 12 digits');

const referralSchema = zod.object({
    referrerName: nameSchema,
    referrerEmail: emailSchema,
    referrerPhoneNumber: phoneSchema,
    refereeName: nameSchema,
    refereeEmail: emailSchema,
    refereePhoneNumber: phoneSchema,
    prefereeCourse: zod.string()
});

function generateReferralCode() {
    const min = 100000;
    const max = 999999;

    const referralCode = Math.floor(Math.random() * (max - min + 1)) + min;

    return referralCode.toString();
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

        const { referrerName, referrerEmail, referrerPhoneNumber, refereeName, refereeEmail, refereePhoneNumber, preferredCourse } = req.body;



        const existingReferrer = await prisma.user.findUnique({
            where: { email: referrerEmail, phoneNumber: referrerPhoneNumber },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        const referrer = existingReferrer || await prisma.user.create({
            data: {
                name: referrerName,
                email: referrerEmail,
                phoneNumber: referrerPhoneNumber
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        const existingReferee = await prisma.user.findUnique({
            where: {email: refereeEmail, phoneNumber: refereePhoneNumber},
            select: {
                id: true,
                name: true,
                email: true
            }
        });


        const referee = existingReferee || await prisma.user.create({
            data: {
                email: refereeEmail,
                name: refereeName,
                phoneNumber: refereePhoneNumber
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        

        const existReferral = await prisma.referral.findFirst({
            where: {
                refereeId: referee.id,
                referrerId: referrer.id,
                preferredCourse
            },
            select: {
                id: true
            }
        });

        if(existReferral){
            return res.status(403).json({
                message: "Referral Already Exists"
            });
        }

        const referralCode = generateReferralCode();

        const referral = await prisma.referral.create({
            data: {
                referrerId: referrer.id,
                refereeId: referee.id,
                referralCode,
                preferredCourse
            }
        });

        successReferrer(referrer, referee, {preferredCourse, referralCode});

        successReferee(referrer, referee, {preferredCourse, referralCode});

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