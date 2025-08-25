/*
  Warnings:

  - You are about to drop the column `variantId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the `ProductVariant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `variants` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."OrderItem" DROP CONSTRAINT "OrderItem_variantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductVariant" DROP CONSTRAINT "ProductVariant_productId_fkey";

-- AlterTable
ALTER TABLE "public"."OrderItem" DROP COLUMN "variantId";

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "pics" TEXT[],
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "variants" JSONB NOT NULL;

-- DropTable
DROP TABLE "public"."ProductVariant";
