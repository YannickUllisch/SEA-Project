-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_dbQuestionnaireAnswers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "questionnaireId" TEXT NOT NULL,
    "answers" TEXT NOT NULL,
    "age" INTEGER,
    "gender" TEXT,
    "country" TEXT,
    CONSTRAINT "dbQuestionnaireAnswers_questionnaireId_fkey" FOREIGN KEY ("questionnaireId") REFERENCES "dbQuestionnaire" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_dbQuestionnaireAnswers" ("age", "answers", "country", "gender", "id", "questionnaireId") SELECT "age", "answers", "country", "gender", "id", "questionnaireId" FROM "dbQuestionnaireAnswers";
DROP TABLE "dbQuestionnaireAnswers";
ALTER TABLE "new_dbQuestionnaireAnswers" RENAME TO "dbQuestionnaireAnswers";
CREATE TABLE "new_dbQuestionnaire" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "experimentId" TEXT NOT NULL,
    "version" TEXT,
    "form" TEXT NOT NULL,
    CONSTRAINT "dbQuestionnaire_experimentId_fkey" FOREIGN KEY ("experimentId") REFERENCES "dbExperiment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_dbQuestionnaire" ("experimentId", "form", "id", "version") SELECT "experimentId", "form", "id", "version" FROM "dbQuestionnaire";
DROP TABLE "dbQuestionnaire";
ALTER TABLE "new_dbQuestionnaire" RENAME TO "dbQuestionnaire";
PRAGMA foreign_key_check("dbQuestionnaireAnswers");
PRAGMA foreign_key_check("dbQuestionnaire");
PRAGMA foreign_keys=ON;
