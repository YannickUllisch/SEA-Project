import React from "react";
import Head from "next/head";
import Link from "next/link";
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";

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

export default function SurveyBuilderWidget() {
  const survey = new Model(surveyJson);
  return <Survey model={survey} />;
}
