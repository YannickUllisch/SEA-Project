import React from "react";
import Head from "next/head";
import Link from "next/link";
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { useRouter } from "next/router";
import { Box, Button, Typography } from "@mui/material";
import theme from "@renderer/src/lib/theme";

const NextPage = () => {
  const surveyJson = {
    elements: [
      {
        name: "FirstName",
        title: "Enter your first name:",
        type: "text",
      },
      {
        name: "LastName",
        title: "Enter your last name:",
        type: "text",
      },
    ],
  };

  const survey = new Model(surveyJson);
  survey.addNavigationItem({
    title: "Exit",
  });

  return (
    <>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ -<Link href="/">Go to home page</Link>
        </p>
        <Button
          variant="contained"
          sx={{
            backgroundImage: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.secondary.light})`,
            color: "white", // Text color
            "&:hover": {
              backgroundImage: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.secondary.main})`,
            },
          }}
          onClick={() => router.push("/survey_builder")}
        >
          Start Questionnaire
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundImage: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.secondary.light})`,
            color: "white", // Text color
            "&:hover": {
              backgroundImage: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.secondary.main})`,
            },
          }}
          onClick={() => router.push("/survey_creator")}
        >
          Start Questionnaire Creator
        </Button>
      </div>
    </>
  );
};

export default NextPage;
