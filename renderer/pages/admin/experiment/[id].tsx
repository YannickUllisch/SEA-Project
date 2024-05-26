import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import AnalyticsTab from "@renderer/src/components/ExperimentTabs/AnalyticsTab";
import AssistantsTab from "@renderer/src/components/ExperimentTabs/AssistantsTab";
import CreatorTab from "@renderer/src/components/ExperimentTabs/CreatorTab";
import CustomTabPanel from "@renderer/src/components/ExperimentTabs/CustomTabPanel";
import DeleteTab from "@renderer/src/components/ExperimentTabs/DeleteTab";
import GeneralTab from "@renderer/src/components/ExperimentTabs/GeneralTab";
import { useSession } from "@renderer/src/components/SessionProvider";
import { Role } from "@renderer/src/lib/role";
import type React from "react";
import { useState } from "react";

const ExperimentPage = () => {
  const [questionnaireId, setQuestionnaireId] = useState<string | null>(null);

  const session = useSession();

  const [tab, setTab] = useState<string>("general");

  const handleEditQuestionnaire = (id: string) => {
    setQuestionnaireId(id);
    setTab("creator");
    console.log("editing questionnaire", id);
  };

  const experimentTabs: {
    roles: Role[];
    id: string;
    component: JSX.Element;
  }[] = [
    {
      roles: [Role.ADMIN, Role.ASSISTANT, Role.OWNER],
      id: "general",
      component: <GeneralTab onEditQuestionnaire={handleEditQuestionnaire} />,
    },
    {
      roles: [Role.ADMIN, Role.ASSISTANT, Role.OWNER],
      id: "analytics",
      component: <AnalyticsTab />,
    },
    {
      roles: [Role.ADMIN, Role.OWNER],
      id: "assistants",
      component: <AssistantsTab />,
    },
    {
      roles: [Role.ADMIN, Role.OWNER],
      id: "delete",
      component: <DeleteTab />,
    },
    {
      roles: [Role.ADMIN, Role.OWNER],
      id: "creator",
      component: <CreatorTab questionnaireId={questionnaireId} />,
    },
  ];

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
    if (newValue !== "creator") {
      // Reset questionnaireId when not navigating to creator tab
      setQuestionnaireId(null);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: 3,
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: 5,
          minWidth: "100%",
          minHeight: "screen",
          borderRadius: 4,
        }}
      >
        <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
          Edit Experiment
        </Typography>
        <Divider />
        <Box sx={{ mt: 1 }}>
          <Tabs centered value={tab} onChange={handleTabChange}>
            {experimentTabs.map(
              (tabConfig) =>
                session &&
                tabConfig.roles.includes(session.user.role) && (
                  <Tab
                    key={`${tabConfig.id}-tab`}
                    label={tabConfig.id}
                    value={tabConfig.id}
                  />
                )
            )}
          </Tabs>
        </Box>
        {experimentTabs.map(
          (tabConfig) =>
            session &&
            tabConfig.roles.includes(session.user.role) && (
              <CustomTabPanel
                key={`${tabConfig.id}-tab-panel`}
                value={tab}
                index={tabConfig.id}
              >
                {tabConfig.component}
              </CustomTabPanel>
            )
        )}
      </Box>
    </Box>
  );
};

export default ExperimentPage;
