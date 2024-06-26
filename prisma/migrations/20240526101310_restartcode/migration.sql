-- CreateTable
CREATE TABLE "dbUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "dbExperiment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "restartCode" TEXT
);

-- CreateTable
CREATE TABLE "dbQuestionnaire" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "experimentId" TEXT NOT NULL,
    "version" TEXT,
    "form" TEXT NOT NULL,
    CONSTRAINT "dbQuestionnaire_experimentId_fkey" FOREIGN KEY ("experimentId") REFERENCES "dbExperiment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "dbQuestionnaireAnswers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "questionnaireId" TEXT NOT NULL,
    "answers" TEXT NOT NULL,
    "age" INTEGER,
    "gender" TEXT,
    "country" TEXT,
    CONSTRAINT "dbQuestionnaireAnswers_questionnaireId_fkey" FOREIGN KEY ("questionnaireId") REFERENCES "dbQuestionnaire" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_dbExperimentTodbUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_dbExperimentTodbUser_A_fkey" FOREIGN KEY ("A") REFERENCES "dbExperiment" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_dbExperimentTodbUser_B_fkey" FOREIGN KEY ("B") REFERENCES "dbUser" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_dbExperimentTodbUser_AB_unique" ON "_dbExperimentTodbUser"("A", "B");

-- CreateIndex
CREATE INDEX "_dbExperimentTodbUser_B_index" ON "_dbExperimentTodbUser"("B");
