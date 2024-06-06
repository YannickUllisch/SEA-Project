import '@main/services/userServices/authHandler'
import '@main/services/experimentServices/getExperimentHandler'
import '@main/services/experimentServices/createExperimentHandler'
import '@main/services/experimentServices/deleteExperimentHandler'
import '@main/services/experimentServices/exportExperimentHandler'
import '@main/services/appServices'
import '@main/services/userServices/addUserHandler'
import '@main/services/userServices/getAssistantsHandler'
import '@main/services/userServices/deleteAssistantHandler'
import '@main/services/userServices/getAdminsHandler'
import '@main/services/userServices/deleteAdminsHandler'
import '@main/services/questionnaireServices/addQuestionnaireHandler'
import '@main/services/questionnaireServices/getQuestionnairesHandler'
import '@main/services/experimentServices/getExperimentAnswers'
import '@main/services/questionnaireServices/saveQuestionnaireHandler'
import '@main/services/questionnaireServices/initRandomQuestionnaire'
import '@main/services/questionnaireServices/deleteQuestionnaireHandler'
import '@main/services/questionnaireServices/copyQuestionnaireHandler'
import { ElectronApp } from '@main/models/ElectronApp'

const main = async () => {
  // Initializing App Window
  new ElectronApp()
}

main()
