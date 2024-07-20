import express, {Request, Response} from 'express';
import { PrismaClient } from '@prisma/client';
import router from './routes';
import expressEjsLayouts from 'express-ejs-layouts';

const PORT = 8000;
const app = express();
export const prisma = new PrismaClient();

app.use(express.json());

app.use(expressEjsLayouts);
app.set('layout extractStyles', true);      
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');



app.use('/', router);


app.listen(PORT, (err?:any)=>{
    if(err){
        console.log(`Error in starting the server at PORT:${PORT}`);
        return;
    }
    console.log('Server is up and running');
});

/*

model User {
  id                 Int        @id @default(autoincrement())
  email              String     @unique
  password           String?
  phoneNumber        String     @unique
  name               String
  referralsMade      Referral[] @relation("ReferrerReferrals")
  referralsReceived  Referral[] @relation("ReferredReferrals")
}

model Referral {
  id                 Int      @id @default(autoincrement())
  referrerId         Int
  referredUserId     Int
  referralCode       String   @unique
  preferredCourse    String

  referrer           User     @relation("ReferrerReferrals", fields: [referrerId], references: [id])
  referredUser       User     @relation("ReferredReferrals", fields: [referredUserId], references: [id])
}

*/