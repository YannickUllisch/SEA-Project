import '@main/services/authHandler'
import '@main/services/getExperimentHandler'
import '@main/services/createExperimentHandler'
import '@main/services/deleteExperimentHandler'
import '@main/services/appServices'
import '@main/services/addUserHandler'
import '@main/services/getAssistantsHandler'
import '@main/services/deleteAssistantHandler'
import '@main/services/getAdminsHandler'
import '@main/services/deleteAdminsHandler'
import '@main/services/addQuestionnaireHandler'
import '@main/services/getQuestionnairesHandler'
import '@main/services/dataExportHandler'
import '@main/services/initRandomQuestionnaire'
import '@main/services/deleteQuestionnaireHandler'
import '@main/services/copyQuestionnaireHandler'
import { ElectronApp } from '@main/models/ElectronApp'

const main = async () => {
  // Initializing App Window
  new ElectronApp()
}

main()
