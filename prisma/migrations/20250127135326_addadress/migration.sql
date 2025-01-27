/*
  Warnings:

  - Added the required column `address` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "address" TEXT NOT NULL;
