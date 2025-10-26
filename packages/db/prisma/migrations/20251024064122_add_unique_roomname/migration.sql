/*
  Warnings:

  - A unique constraint covering the columns `[roomname]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Room_roomname_key" ON "Room"("roomname");
