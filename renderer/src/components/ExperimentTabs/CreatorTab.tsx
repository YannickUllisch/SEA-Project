import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// We need to dynamically import the surveycreator otherwise it cant laod
const SurveyComponent = dynamic(
  () => import("@renderer/src/components/survey/SurveyCreator"),
  {
    ssr: false,
  }
);

const CreatorTab = () => {
  const router = useRouter();

  // This fetches the current experimentId, which the editor is rendered for. Needed to push questionnaire data
  // to the right experiment in backend
  const currExperimentId = router.query.id as string;

  const [surveyJson, setSurveyJson] = useState<object | null>(null);

  const handleSaveSurvey = (json: object) => {
    console.log(currExperimentId);
    setSurveyJson(json);
    console.log(surveyJson);
    console.log(currExperimentId);
    window.ipc.send("createQuestionnaire", { currExperimentId, surveyJson });
  };

  return <SurveyComponent json={{}} onSave={handleSaveSurvey} />;
};

export default CreatorTab;
