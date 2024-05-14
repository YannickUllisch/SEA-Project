import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import { setLicenseKey } from "survey-core";

// Set the license key
setLicenseKey(
  "M2Q5NzE0OGItYTI3Ny00ZTc5LTk1NWUtZmJhNDAxNDZjNDk3OzE9MjAyNC0wNy0zMSwyPTIwMjQtMDctMzEsND0yMDI0LTA3LTMx"
);

// Dynamically import SurveyCreatorComponent
const SurveyCreatorComponent = dynamic(
  () =>
    import("survey-creator-react").then((mod) => mod.SurveyCreatorComponent),
  { ssr: false } // This ensures that the component is only imported in the client side
);

const creatorOptions = {
  showLogicTab: true,
  isAutoSave: true,
};

export default function SurveyCreatorWidget() {
  const [surveyCreator, setSurveyCreator] = useState(null);

  useEffect(() => {
    // Initialize SurveyCreator only on the client side
    if (typeof window !== "undefined") {
      const { SurveyCreator } = require("survey-creator-react");
      const creator = new SurveyCreator(creatorOptions);
      setSurveyCreator(creator);
    }
  }, []);

  return (
    <>
      {surveyCreator ? (
        <SurveyCreatorComponent creator={surveyCreator} />
      ) : (
        <div>Loading Survey Creator...</div>
      )}
    </>
  );
}
