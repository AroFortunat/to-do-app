-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tache" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "Nom" TEXT NOT NULL,
    "Description" TEXT,
    "Priority" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'en cours',
    "Author_id" TEXT NOT NULL,
    "Assigner_à" TEXT NOT NULL,
    "Deadline" DATETIME NOT NULL,
    "Created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Tache_Author_id_fkey" FOREIGN KEY ("Author_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
