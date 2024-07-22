-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "phoneNum" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
