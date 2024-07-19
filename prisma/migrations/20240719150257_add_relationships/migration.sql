/*
  Warnings:

  - You are about to drop the column `referredEmail` on the `Referral` table. All the data in the column will be lost.
  - You are about to drop the column `referredName` on the `Referral` table. All the data in the column will be lost.
  - You are about to drop the column `referredPhoneNumber` on the `Referral` table. All the data in the column will be lost.
  - You are about to drop the column `referrerEmail` on the `Referral` table. All the data in the column will be lost.
  - You are about to drop the column `referrerName` on the `Referral` table. All the data in the column will be lost.
  - You are about to drop the column `referrerPhoneNumber` on the `Referral` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[referrerId,referredUserId]` on the table `Referral` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `referredUserId` to the `Referral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referrerId` to the `Referral` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Referral_referredEmail_key` ON `Referral`;

-- DropIndex
DROP INDEX `Referral_referredPhoneNumber_key` ON `Referral`;

-- DropIndex
DROP INDEX `Referral_referrerEmail_key` ON `Referral`;

-- DropIndex
DROP INDEX `Referral_referrerPhoneNumber_key` ON `Referral`;

-- AlterTable
ALTER TABLE `Referral` DROP COLUMN `referredEmail`,
    DROP COLUMN `referredName`,
    DROP COLUMN `referredPhoneNumber`,
    DROP COLUMN `referrerEmail`,
    DROP COLUMN `referrerName`,
    DROP COLUMN `referrerPhoneNumber`,
    ADD COLUMN `referredUserId` INTEGER NOT NULL,
    ADD COLUMN `referrerId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Referral_referrerId_referredUserId_key` ON `Referral`(`referrerId`, `referredUserId`);

-- AddForeignKey
ALTER TABLE `Referral` ADD CONSTRAINT `Referral_referrerId_fkey` FOREIGN KEY (`referrerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Referral` ADD CONSTRAINT `Referral_referredUserId_fkey` FOREIGN KEY (`referredUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
