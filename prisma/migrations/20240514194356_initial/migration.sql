-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "songTitle" TEXT NOT NULL,
    "genres" TEXT[],
    "bpm" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "rpm" INTEGER NOT NULL,
    "release" TEXT NOT NULL,
    "discogsLink" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);
