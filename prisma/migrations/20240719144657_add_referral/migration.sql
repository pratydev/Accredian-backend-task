/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `Referral` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `referrerName` VARCHAR(191) NOT NULL,
    `referrerEmail` VARCHAR(191) NOT NULL,
    `referrerPhoneNumber` VARCHAR(191) NOT NULL,
    `referredName` VARCHAR(191) NOT NULL,
    `referredEmail` VARCHAR(191) NOT NULL,
    `referredPhoneNumber` VARCHAR(191) NOT NULL,
    `referralCode` INTEGER NOT NULL,
    `preferredCourse` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Referral_referrerEmail_key`(`referrerEmail`),
    UNIQUE INDEX `Referral_referrerPhoneNumber_key`(`referrerPhoneNumber`),
    UNIQUE INDEX `Referral_referredEmail_key`(`referredEmail`),
    UNIQUE INDEX `Referral_referredPhoneNumber_key`(`referredPhoneNumber`),
    UNIQUE INDEX `Referral_referralCode_key`(`referralCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_phoneNumber_key` ON `User`(`phoneNumber`);
