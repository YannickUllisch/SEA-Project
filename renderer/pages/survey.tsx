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
const survey = new Model(surveyJson);

const NextPage = () => {
  return (
    <>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ -<Link href="/">Go to home page</Link>
        </p>
        <Survey model={survey} />
        <div> yoyoyo</div>
      </div>
    </>
  );
};

export default NextPage;
