// import React from "react";
// import Head from "next/head";
// import { Box, Button } from "@mui/material";
// import "survey-core/defaultV2.min.css";
// import { Model } from "survey-core";
// import { Survey } from "survey-react-ui";

// const NextPage = () => {
//   const surveyJson = {
//     title: "Yehaw Trest",
//     description: "Yehaw telelelele",
//     logoPosition: "right",
//     pages: [
//       {
//         name: "page1",
//         elements: [
//           {
//             type: "rating",
//             name: "question1",
//             title: "yo",
//           },
//           {
//             type: "text",
//             name: "question2",
//             title: "yo2",
//           },
//         ],
//       },
//     ],
//   };

//   const survey = new Model(surveyJson);
//   survey.addNavigationItem({
//     title: "Exit",
//   });

//   return (
//     <Box
//       sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}
//     >
//       <Survey model={survey} />
//     </Box>
//   );
// };

// export default NextPage;

import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import 'survey-core/defaultV2.min.css'
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import { useRouter } from 'next/router'
import Restart from '../src/components/restart'
import type { FrontendQuestionnaire } from '@renderer/src/lib/types'
import type { dbQuestionnaire } from '@prisma/client'

const SurveyPage = () => {
  const router = useRouter()
  const [currQuestionnaire, setCurrQuestionnaire] = useState<
    FrontendQuestionnaire | undefined
  >(undefined)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <Needed to fetch from backend>
  useEffect(() => {
    // This will return us a random questionnaire based on the experiment found using the executedExperiment ID given as a query parameter.
    window.ipc.send(
      'initRandomQuestionnaire',
      router.query.executedExperiment as string,
    )

    // The response we get is a randomized questionnaire from the executed experiment.
    // TODO: Somehow find a way to parse the JSON and input it correctly into the model and then rendering the model
    window.ipc.on(
      'initRandomQuestionnaire',
      (questionnaire: FrontendQuestionnaire) => {
        setCurrQuestionnaire(questionnaire)
      },
    )
  }, [currQuestionnaire === undefined])

  const surveyJson = {
    title: 'Yehaw Trest',
    description: 'Yehaw telelelele',
    logoPosition: 'right',
    pages: [
      {
        name: 'page1',
        elements: [
          {
            type: 'rating',
            name: 'question1',
            title: 'yo',
          },
          {
            type: 'text',
            name: 'question2',
            title: 'yo2',
          },
        ],
      },
    ],
  }

  const [surveyModel, _setSurveyModel] = useState<Model>(new Model(surveyJson))

  //used to check if questionnaire is completed
  const [isCompleted, setIsCompleted] = useState(false)

  // Use useEffect to add a navigation item once the survey model is set up
  useEffect(() => {
    if (surveyModel) {
      surveyModel.addNavigationItem({
        title: 'Exit',
      })

      surveyModel.onComplete.add(() => {
        setIsCompleted(true)
      })
    }
  }, [surveyModel])

  const redirectToHomePage = () => {
    router.push('/participant')
  }

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {surveyJson ? <Survey model={surveyModel} /> : null}

      {isCompleted && <Restart redirectToHomePage={redirectToHomePage} />}
    </Box>
  )
}

export default SurveyPage
