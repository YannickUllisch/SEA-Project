import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { toast } from "sonner";
import type { Questionnaire } from "@main/models/Questionnaire/Questionnaire";
import { json } from "stream/consumers";

// We need to dynamically import the surveycreator otherwise it can't load
const SurveyComponent = dynamic(
  () => import("@renderer/src/components/survey/SurveyCreator"),
  {
    ssr: false,
  }
);

const CreatorTab = ({ questionnaireId }) => {
  const router = useRouter();
  // This fetches the current experimentId, which the editor is rendered for. Needed to push questionnaire data
  // to the right experiment in the backend
  const currExperimentId = router.query.id as string;

  const [surveyJson, setSurveyJson] = useState<object | null>(null);
  const [title, setTitle] = useState<string>("");
  const [questionnaireData, setQuestionnaireData] = useState<any>(null);

  useEffect(() => {
    if (questionnaireId) {
      // Simulate fetching data from the database
      console.log("Fetching data for ID:", questionnaireId);
      // Fetch the data for the given ID
      //fetchQuestionnaireData(questionnaireId);

      window.ipc.send("getQuestionnaire", {
        experimentID: currExperimentId,
        idQuestionnaire: questionnaireId,
      });

      window.ipc.on("getQuestionnaire", (message: string) => {
        //toast.success(message);
        setSurveyJson(JSON.parse(message));
        console.log(message);
      });
    } else {
      console.log("Creating a new questionnaire");
      setQuestionnaireData(null); // Ensure data is reset for creation
    }
    return () => {
      window.ipc.removeAllListeners("getQuestionnaire");
    };
  }, [questionnaireId]);

  useEffect(() => {
    if (surveyJson !== null) {
      if (!questionnaireId) {
        window.ipc.send("createQuestionnaire", {
          experimentID: currExperimentId,
          experimentStructureData: surveyJson,
          version: title,
        });

        window.ipc.on("createdQuestionnaire", (message: string) => {
          toast.success(message);
        });

        window.ipc.on("failCreateQuestionnaire", (message: string) => {
          toast.error(message);
        });
      } else {
        window.ipc.send("editQuestionnaire", {
          experimentID: currExperimentId,
          questionnaireID: questionnaireId,
          experimentStructureData: surveyJson,
          version: title,
        });

        window.ipc.on("editQuestionnaire", (message: string) => {
          toast.success(message);
        });

        window.ipc.on("failEditQuestionnaire", (message: string) => {
          toast.error(message);
        });
      }
    }

    return () => {
      window.ipc.removeAllListeners("createdQuestionnaire");
      window.ipc.removeAllListeners("failCreateQuestionnaire");
    };
  }, [surveyJson, currExperimentId, title]);

  return (
    <SurveyComponent
      key={JSON.stringify(surveyJson)}
      json={surveyJson || {}}
      setSurveyJSON={setSurveyJson}
      setSurveyTitle={setTitle}
    />
  );
};

export default CreatorTab;
