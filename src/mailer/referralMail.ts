import {SentMessageInfo } from 'nodemailer';

import { transporter, renderTemplate } from '../config/nodemailer';

interface Referrer {
    name: string;
    email: string;
}

interface Referred {
    name: string;
    email: string;
}

interface MailDetails {
    preferredCourse: string;
    referralCode: number;
}


function errorHandler(err?:Error | null, info?:SentMessageInfo){
    if(err){
        console.log('Error in sending mail: ');
        return;
    }
    console.log('Mail sent successfully');
}

function successReferrer(referrer: Referrer, referred: Referred, details: MailDetails){
    const subject:string = 'Confirmation Regarding Successful Referral';
    const htmlString = renderTemplate({referrer, referred, details}, '/referralMailer/successReferrer.ejs');
    const customText = `You have successfully referred your friend ${referred.name}  for the course ${details.preferredCourse}`

    transporter.sendMail({
        from: {
            name: 'Accredian.com',
            address: 'noreply@accredian.com'
        },
        to: referrer.email,
        subject: subject,
        html: htmlString,
        text: customText
    }, errorHandler);
}

function successReferred(referrer: Referrer, referred: Referred, details: MailDetails){
    const subject:string = 'Confirmation Regarding Successful Referral';
    const htmlString = renderTemplate({referrer, referred, details}, '/referralMailer/successReferred.ejs');
    const customText = `You have successfully referred your friend ${referred.name}  for the course ${details.preferredCourse}`

    transporter.sendMail({
        from: {
            name: 'Accredian.com',
            address: 'noreply@accredian.com'
        },
        to: referrer.email,
        subject: subject,
        html: htmlString,
        text: customText
    }, errorHandler);

}

export {successReferrer, successReferred};