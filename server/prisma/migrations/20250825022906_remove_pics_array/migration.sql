/*
  Warnings:

  - You are about to drop the `ProductTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ProductTag" DROP CONSTRAINT "ProductTag_productId_fkey";

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "tags" TEXT[];

-- DropTable
DROP TABLE "public"."ProductTag";
