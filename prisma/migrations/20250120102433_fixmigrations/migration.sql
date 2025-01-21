/*
  Warnings:

  - You are about to drop the `_CartToItemcart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CartToItemcart" DROP CONSTRAINT "_CartToItemcart_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartToItemcart" DROP CONSTRAINT "_CartToItemcart_B_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "cartid" DROP NOT NULL;

-- DropTable
DROP TABLE "_CartToItemcart";

-- CreateTable
CREATE TABLE "_CartItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CartItem_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CartItem_B_index" ON "_CartItem"("B");

-- AddForeignKey
ALTER TABLE "_CartItem" ADD CONSTRAINT "_CartItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartItem" ADD CONSTRAINT "_CartItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Itemcart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
