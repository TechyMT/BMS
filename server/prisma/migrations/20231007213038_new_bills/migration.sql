/*
  Warnings:

  - Added the required column `vendorDetails` to the `Bills` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `totalAmount` on the `Bills` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Bills" ADD COLUMN     "items" JSONB[],
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "vendorDetails" JSONB NOT NULL,
DROP COLUMN "totalAmount",
ADD COLUMN     "totalAmount" JSONB NOT NULL;
