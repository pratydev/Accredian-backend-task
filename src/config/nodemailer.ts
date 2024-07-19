import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.PROFILE_GOOGLE_EMAIL,
        pass: process.env.PROFILE_GOOGLE_APP_PASSWORD,
        clientId: process.env.PROFILE_GOOGLE_CLIENT_ID,
        clientSecret: process.env.PROFILE_GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.PROFILE_GOOGLE_REFRESH_TOKEN
    }
});

function renderTemplate(data: object, relativePath: string){
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname, '../views/mailer', relativePath),
        data,
        function(err?, template?){
            if(err){
                return;
            }
            mailHtml = template;
        }
    )
    return mailHtml;
}

export {transporter, renderTemplate};