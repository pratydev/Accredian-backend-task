/*
  Warnings:

  - You are about to drop the column `referredUserId` on the `Referral` table. All the data in the column will be lost.
  - Added the required column `refereeId` to the `Referral` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Referral` DROP FOREIGN KEY `Referral_referredUserId_fkey`;

-- AlterTable
ALTER TABLE `Referral` DROP COLUMN `referredUserId`,
    ADD COLUMN `refereeId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Referral` ADD CONSTRAINT `Referral_refereeId_fkey` FOREIGN KEY (`refereeId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
