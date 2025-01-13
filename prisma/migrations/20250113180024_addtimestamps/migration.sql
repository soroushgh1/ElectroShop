/*
  Warnings:

  - Added the required column `created_at` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email_verifyed_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "created_at" TEXT NOT NULL,
ADD COLUMN     "updated_at" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "created_at" TEXT NOT NULL,
ADD COLUMN     "updated_at" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email_verifyed_at" TEXT NOT NULL;
