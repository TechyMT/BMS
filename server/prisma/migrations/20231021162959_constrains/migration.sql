/*
  Warnings:

  - Added the required column `fk_user` to the `Bills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Bills` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bills" ADD COLUMN     "fk_user" INTEGER NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Bills" ADD CONSTRAINT "Bills_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
