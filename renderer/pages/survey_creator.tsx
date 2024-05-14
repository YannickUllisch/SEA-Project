import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";

import { setLicenseKey } from "survey-core";

setLicenseKey(
  "M2Q5NzE0OGItYTI3Ny00ZTc5LTk1NWUtZmJhNDAxNDZjNDk3OzE9MjAyNC0wNy0zMSwyPTIwMjQtMDctMzEsND0yMDI0LTA3LTMx"
);

const creatorOptions = {
  showLogicTab: true,
  isAutoSave: true,
};

export default function SurveyCreatorWidget() {
  const creator = new SurveyCreator(creatorOptions);
  return <SurveyCreatorComponent creator={creator} />;
}
