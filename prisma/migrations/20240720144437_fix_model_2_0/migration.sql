/*
  Warnings:

  - A unique constraint covering the columns `[referrerId,refereeId,preferredCourse]` on the table `Referral` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Referral_referrerId_refereeId_preferredCourse_key` ON `Referral`(`referrerId`, `refereeId`, `preferredCourse`);
