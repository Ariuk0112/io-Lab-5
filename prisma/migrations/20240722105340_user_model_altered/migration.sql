-- CreateEnum
CREATE TYPE "userType" AS ENUM ('Customer', 'Seller');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "userType" NOT NULL DEFAULT 'Customer';
