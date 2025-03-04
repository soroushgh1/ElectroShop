/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `discount` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "discountid" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "discount_id_key" ON "discount"("id");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_discountid_fkey" FOREIGN KEY ("discountid") REFERENCES "discount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
