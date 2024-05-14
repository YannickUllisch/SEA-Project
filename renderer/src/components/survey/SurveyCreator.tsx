import { useState } from 'react'
import type { ICreatorOptions } from 'survey-creator-core'
import { SurveyCreatorComponent, SurveyCreator } from 'survey-creator-react'
import 'survey-core/defaultV2.css'
import 'survey-creator-core/survey-creator-core.css'
import { Box, Button, Divider, Box as MuiBox } from '@mui/material'

const defaultCreatorOptions: ICreatorOptions = {
  showLogicTab: false,
  showTranslationTab: false,
  showThemeTab: false,
  showJSONEditorTab: false,
  showErrorOnFailedSave: true,
  pageEditMode: 'single',
  isAutoSave: true,
  showSurveyTitle: false,
  generateValidJSON: true,
}

const SurveyCreatorWidget = (props: {
  json: object
  options?: ICreatorOptions
  onSave: (json: object) => void
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

    creator.JSON = props.json
  }

  const handleSave = () => {
    const surveyJson = creator.JSON
    if (surveyJson) {
      props.onSave(surveyJson)
    }
  }

  return (
    <div style={{ position: 'relative', height: '1000px' }}>
      {/* White box to overlay missing license problem */}
      <Box
        sx={{
          position: 'absolute',
          top: { md: 950, xs: 900 },
          display: 'flex',
          width: '100%',
          height: { md: '70px', xs: '100px' },
          backgroundColor: '#f5f5f5',
          zIndex: 1,
        }}
      >
        <Divider />
        <Button
          fullWidth
          sx={{ zIndex: 5, height: '50px' }}
          variant="contained"
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>

      <SurveyCreatorComponent creator={creator} />
    </div>
  )
}

export default SurveyCreatorWidget
