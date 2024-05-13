import "@main/services/authHandler";
import "@main/services/messageHandler";
import "@main/services/getExperimentHandler";
import "@main/services/createExperimentHandler";
import "@main/services/deleteExperimentHandler";
import "@main/services/appServices";
import "@main/services/addUserHandler";
import { ElectronApp } from "@main/models/ElectronApp";

const main = async () => {
  // Initializing App Window
  new ElectronApp();
};

main();
