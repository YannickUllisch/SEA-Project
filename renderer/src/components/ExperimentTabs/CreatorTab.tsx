import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

// We need to dynamically import the surveycreator otherwise it cant laod
const SurveyComponent = dynamic(
  () => import('@renderer/src/components/survey/SurveyCreator'),
  {
    ssr: false,
  },
)

const CreatorTab = () => {
  const router = useRouter()
  const currExperimentId = router.query.id as string

  const [surveyJson, setSurveyJson] = useState<object | null>(null)

  const handleSaveSurvey = (json: object) => {
    setSurveyJson(json)
    console.log(surveyJson)
    console.log(currExperimentId)
  }

  return <SurveyComponent json={{}} onSave={handleSaveSurvey} />
}

export default CreatorTab
