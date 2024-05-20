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
import Restart from './restart'

const NextPage = () => {
  const router = useRouter()

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

  const [surveyModel] = useState(new Model(surveyJson))
  //used to check if questionnaire is completed
  const [isCompleted, setIsCompleted] = useState(false)

  // Use useEffect to add a navigation item once the survey model is set up
  useEffect(() => {
    surveyModel.addNavigationItem({
      title: 'Exit',
    })

    surveyModel.onComplete.add(() => {
      setIsCompleted(true)
    })
  }, [surveyModel])

  const redirectToHomePage = () => {
    router.push('/participant')
  }

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Survey model={surveyModel} />
      {isCompleted && <Restart redirectToHomePage={redirectToHomePage} />}
    </Box>
  )
}

export default NextPage
