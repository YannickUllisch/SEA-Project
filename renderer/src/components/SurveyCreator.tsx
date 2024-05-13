import { useState } from 'react'
import type { ICreatorOptions } from 'survey-creator-core'
import { SurveyCreatorComponent, SurveyCreator } from 'survey-creator-react'
import 'survey-core/defaultV2.css'
import 'survey-creator-core/survey-creator-core.css'

const defaultCreatorOptions: ICreatorOptions = {
  showLogicTab: false,
  showTranslationTab: false,
  showThemeTab: false,
}

const SurveyCreatorWidget = (props: {
  json?: object
  options?: ICreatorOptions
}) => {
  let [creator, setCreator] = useState<SurveyCreator>()

  if (!creator) {
    creator = new SurveyCreator(props.options || defaultCreatorOptions)
    creator.saveSurveyFunc = (
      no: number,
      callback: (num: number, status: boolean) => void,
    ) => {
      callback(no, true)
    }
    setCreator(creator)
  }

  creator.JSON = props.json

  return <SurveyCreatorComponent creator={creator} />
}

export default SurveyCreatorWidget
