/*
  Warnings:

  - Added the required column `type` to the `AlatAWL` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."AlatAWL" ADD COLUMN     "type" TEXT NOT NULL;
