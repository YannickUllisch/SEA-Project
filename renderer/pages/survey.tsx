import React from "react";
import Head from "next/head";
import Link from "next/link";
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import SurveyCreatorWidget from "./survey/survey_creator";
import { useRouter } from "next/router";
import { Box, Button, Typography } from "@mui/material";
import theme from "@renderer/src/lib/theme";

const NextPage = () => {
  const router = useRouter();
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
      </div>
    </>
  );
};

export default NextPage;
