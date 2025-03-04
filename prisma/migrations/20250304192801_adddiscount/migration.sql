-- CreateTable
CREATE TABLE "discount" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "expire" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "discount_name_key" ON "discount"("name");
