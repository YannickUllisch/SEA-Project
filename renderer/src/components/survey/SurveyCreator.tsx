import { useState } from 'react'
import type { ICreatorOptions } from 'survey-creator-core'
import { SurveyCreatorComponent, SurveyCreator } from 'survey-creator-react'
import 'survey-core/defaultV2.css'
import 'survey-creator-core/survey-creator-core.css'
import { Box, Button, Divider, Box as MuiBox } from '@mui/material'
import QuestionnaireTitleDialog from '@renderer/src/components/modals/questionnaireTitleDialog'

import { setLicenseKey } from 'survey-core'

setLicenseKey(
  'M2Q5NzE0OGItYTI3Ny00ZTc5LTk1NWUtZmJhNDAxNDZjNDk3OzE9MjAyNC0wNy0zMSwyPTIwMjQtMDctMzEsND0yMDI0LTA3LTMx',
)

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
  setSurveyJSON: React.Dispatch<React.SetStateAction<object>>
  setSurveyTitle?: React.Dispatch<React.SetStateAction<string>>
}) => {
  let [creator, setCreator] = useState<SurveyCreator>()
  const [createDialog, setCreateDialog] = useState(false)

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

  const handleCreate = (title: string) => {
    props.setSurveyJSON(creator.JSON)
    props.setSurveyTitle(title)
  }

  return (
    <>
      <div style={{ position: 'relative', height: '1000px' }}>
        {/* White box to overlay missing license problem */}
        <SurveyCreatorComponent creator={creator} />

        <Button
          fullWidth
          sx={{ zIndex: 5, height: '50px' }}
          variant="contained"
          onClick={() => setCreateDialog(true)}
        >
          Save
        </Button>
        <QuestionnaireTitleDialog
          open={createDialog}
          setOpen={setCreateDialog}
          onSave={handleCreate}
        />
      </div>
    </>
  )
}

export default SurveyCreatorWidget
