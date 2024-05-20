/*
  Warnings:

  - The primary key for the `dbQuestionnaire` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `questionnaireID` on the `dbQuestionnaire` table. All the data in the column will be lost.
  - The primary key for the `dbExperiment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `experimentID` on the `dbExperiment` table. All the data in the column will be lost.
  - The required column `id` was added to the `dbQuestionnaire` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `dbExperiment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_dbQuestionnaire" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "experimentId" TEXT NOT NULL,
    "version" TEXT,
    "form" TEXT NOT NULL,
    CONSTRAINT "dbQuestionnaire_experimentId_fkey" FOREIGN KEY ("experimentId") REFERENCES "dbExperiment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_dbQuestionnaire" ("experimentId", "form", "version") SELECT "experimentId", "form", "version" FROM "dbQuestionnaire";
DROP TABLE "dbQuestionnaire";
ALTER TABLE "new_dbQuestionnaire" RENAME TO "dbQuestionnaire";
CREATE TABLE "new_dbExperiment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_dbExperiment" ("description", "title") SELECT "description", "title" FROM "dbExperiment";
DROP TABLE "dbExperiment";
ALTER TABLE "new_dbExperiment" RENAME TO "dbExperiment";
CREATE TABLE "new_dbQuestionnaireAnswers" (
    "questionnaireAnswersID" TEXT NOT NULL PRIMARY KEY,
    "questionnaireId" TEXT NOT NULL,
    "answers" TEXT NOT NULL,
    CONSTRAINT "dbQuestionnaireAnswers_questionnaireId_fkey" FOREIGN KEY ("questionnaireId") REFERENCES "dbQuestionnaire" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_dbQuestionnaireAnswers" ("answers", "questionnaireAnswersID", "questionnaireId") SELECT "answers", "questionnaireAnswersID", "questionnaireId" FROM "dbQuestionnaireAnswers";
DROP TABLE "dbQuestionnaireAnswers";
ALTER TABLE "new_dbQuestionnaireAnswers" RENAME TO "dbQuestionnaireAnswers";
CREATE TABLE "new__dbExperimentTodbUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_dbExperimentTodbUser_A_fkey" FOREIGN KEY ("A") REFERENCES "dbExperiment" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_dbExperimentTodbUser_B_fkey" FOREIGN KEY ("B") REFERENCES "dbUser" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__dbExperimentTodbUser" ("A", "B") SELECT "A", "B" FROM "_dbExperimentTodbUser";
DROP TABLE "_dbExperimentTodbUser";
ALTER TABLE "new__dbExperimentTodbUser" RENAME TO "_dbExperimentTodbUser";
CREATE UNIQUE INDEX "_dbExperimentTodbUser_AB_unique" ON "_dbExperimentTodbUser"("A", "B");
CREATE INDEX "_dbExperimentTodbUser_B_index" ON "_dbExperimentTodbUser"("B");
PRAGMA foreign_key_check("dbQuestionnaire");
PRAGMA foreign_key_check("dbExperiment");
PRAGMA foreign_key_check("dbQuestionnaireAnswers");
PRAGMA foreign_key_check("_dbExperimentTodbUser");
PRAGMA foreign_keys=ON;
