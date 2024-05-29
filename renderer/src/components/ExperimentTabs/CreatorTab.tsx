import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { toast } from 'sonner'

// We need to dynamically import the surveycreator otherwise it can't load
const SurveyComponent = dynamic(
  () => import('@renderer/src/components/survey/SurveyCreator'),
  {
    ssr: false,
  },
)

const CreatorTab = ({ questionnaireId }) => {
  const router = useRouter()
  // This fetches the current experimentId, which the editor is rendered for. Needed to push questionnaire data
  // to the right experiment in the backend
  const currExperimentId = router.query.id as string

  const [surveyJson, setSurveyJson] = useState<object | null>(null)
  // We use this state to determine when we actually press the save button. Otherwise a lot of empty updates will be sent to backend.
  const [finishedEditing, setFinishedEditing] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [questionnaireData, setQuestionnaireData] = useState<any>(null)

  useEffect(() => {
    if (questionnaireId) {
      window.ipc.send('getQuestionnaire', {
        experimentID: currExperimentId,
        idQuestionnaire: questionnaireId,
      })

      window.ipc.on('getQuestionnaire', (message: string) => {
        setSurveyJson(JSON.parse(message))
      })
    } else {
      setQuestionnaireData(null) // Ensure data is reset for creation
    }
    return () => {
      window.ipc.removeAllListeners('getQuestionnaire')
    }
  }, [questionnaireId, currExperimentId])

  useEffect(() => {
    if (surveyJson !== null) {
      if (!questionnaireId && finishedEditing) {
        setFinishedEditing(false)
        window.ipc.send('createQuestionnaire', {
          experimentID: currExperimentId,
          experimentStructureData: surveyJson,
          version: title,
        })
      } else if (finishedEditing) {
        setFinishedEditing(false)
        window.ipc.send('editQuestionnaire', {
          experimentID: currExperimentId,
          questionnaireID: questionnaireId,
          experimentStructureData: surveyJson,
        })
      }
    }

    // Listening for event replies to raise toasts
    window.ipc.on('failCreateQuestionnaire', (message: string) => {
      toast.error(message)
    })
    window.ipc.on('createdQuestionnaire', (message: string) => {
      toast.success(message)
    })
    window.ipc.on('editedQuestionnaire', (message: string) => {
      toast.success(message)
    })
    window.ipc.on('failEditQuestionnaire', (message: string) => {
      toast.error(message)
    })

    // Needed to remove multiple toasts
    return () => {
      window.ipc.removeAllListeners('createdQuestionnaire')
      window.ipc.removeAllListeners('failCreateQuestionnaire')
      window.ipc.removeAllListeners('editedQuestionnaire')
      window.ipc.removeAllListeners('failEditQuestionnaire')
    }
  }, [surveyJson, currExperimentId, questionnaireId, title, finishedEditing])

  return (
    <SurveyComponent
      json={surveyJson}
      setSurveyJSON={setSurveyJson}
      setSurveyTitle={setTitle}
      isUpdate={questionnaireId ? true : false}
      setFinishedEditing={setFinishedEditing}
    />
  )
}

export default CreatorTab
