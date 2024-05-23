import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { useRouter } from "next/router";
import Restart from "../src/components/restart";
import type { FrontendQuestionnaire } from "@renderer/src/lib/types";

const SurveyPage = () => {
  const router = useRouter();

  const [currQuestionnaire, setCurrQuestionnaire] = useState<
    FrontendQuestionnaire | undefined
  >(undefined);

  const [surveyModel, setSurveyModel] = useState<Model>(new Model());

  //used to check if questionnaire is completed
  const [isCompleted, setIsCompleted] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <Needed to fetch from backend>
  useEffect(() => {
    // This will return us a random questionnaire based on the experiment found using the executedExperiment ID given as a query parameter.
    window.ipc.send("initRandomQuestionnaire", {
      experimentID: router.query.executedExperiment as string,
    });

    // The response we get is a randomized questionnaire from the executed experiment.
    // TODO: Somehow find a way to parse the JSON and input it correctly into the model and then rendering the model
    window.ipc.on(
      "initRandomQuestionnaire",
      (questionnaire: FrontendQuestionnaire) => {
        setCurrQuestionnaire(questionnaire);
        const surveyModel = new Model(JSON.parse(questionnaire.form));
        surveyModel.showTitle = false;
        setSurveyModel(surveyModel);
      }
    );
  }, [currQuestionnaire === undefined]);

  // Use useEffect to add a navigation item once the survey model is set up
  useEffect(() => {
    if (surveyModel) {
      surveyModel.addNavigationItem({
        title: "Exit",
      });

      surveyModel.onComplete.add((sender) => {
        console.log(JSON.stringify(sender.data));

        window.ipc.send("saveQuestionnaire", {
          questionnaireID: currQuestionnaire.id,
          questionnaireAnswerData: sender.data,
        });

        setIsCompleted(true);
      });
    }
  }, [surveyModel]);

  const redirectToHomePage = () => {
    router.push({
      pathname: "/participant",
      query: { executedExperiment: router.query.executedExperiment as string },
    });
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Survey model={surveyModel} />

      {isCompleted && <Restart redirectToHomePage={redirectToHomePage} />}
    </Box>
  );
};

export default SurveyPage;
