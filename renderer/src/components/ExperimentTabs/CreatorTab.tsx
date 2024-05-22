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

const CreatorTab = () => {
  const router = useRouter()

  // This fetches the current experimentId, which the editor is rendered for. Needed to push questionnaire data
  // to the right experiment in the backend
  const currExperimentId = router.query.id as string

  const [surveyJson, setSurveyJson] = useState<object | null>(null)

  useEffect(() => {
    if (surveyJson !== null) {
      window.ipc.send('createQuestionnaire', {
        experimentID: currExperimentId,
        experimentStructureData: surveyJson,
      })

      window.ipc.on('createdQuestionnaire', (message: string) => {
        toast.success(message)
      })

      window.ipc.on('failCreateQuestionnaire', (message: string) => {
        toast.error(message)
      })
    }

    return () => {
      window.ipc.removeAllListeners('createdQuestionnaire')
      window.ipc.removeAllListeners('failCreateQuestionnaire')
    }
  }, [surveyJson, currExperimentId])

  return <SurveyComponent json={{}} setSurveyJSON={setSurveyJson} />
}

export default CreatorTab
