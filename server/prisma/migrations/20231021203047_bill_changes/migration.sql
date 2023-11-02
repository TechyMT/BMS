/*
  Warnings:

  - The `notes` column on the `Bills` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Bills" DROP COLUMN "notes",
ADD COLUMN     "notes" JSONB,
ALTER COLUMN "vendorDetails" DROP NOT NULL;
