import { useEffect, useState } from 'react'
import type { ICreatorOptions } from 'survey-creator-core'
import { SurveyCreatorComponent, SurveyCreator } from 'survey-creator-react'
import 'survey-core/defaultV2.css'
import 'survey-creator-core/survey-creator-core.css'
import { Box, Button, Divider, Box as MuiBox } from '@mui/material'
import QuestionnaireTitleDialog from '@renderer/src/components/modals/questionnaireTitleDialog'

import { Action, setLicenseKey } from 'survey-core'
import theme from '@renderer/src/lib/theme'

setLicenseKey(
  'removed',
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
  isUpdate?: boolean
  setFinishedEditing?: React.Dispatch<React.SetStateAction<boolean>>
  setSurveyJSON: React.Dispatch<React.SetStateAction<object>>
  setSurveyTitle?: React.Dispatch<React.SetStateAction<string>>
}) => {
  let [creator, setCreator] = useState<SurveyCreator>()
  const [createDialog, setCreateDialog] = useState(false)

  // Updating creator JSON, when input JSON changes (in cases of edit)
  useEffect(() => {
    creator.JSON = props.json
  }, [props.json, creator])

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

  // On create we both want to save title and json
  const handleCreate = (title: string) => {
    if (props.setFinishedEditing) {
      props.setFinishedEditing(true)
    }
    props.setSurveyJSON(creator.JSON)
    props.setSurveyTitle(title)
  }

  // On Update this is run, we avoid starting prompt to enter Title.
  const handleUpdate = () => {
    if (props.setFinishedEditing) {
      props.setFinishedEditing(true)
    }
    props.setSurveyJSON(creator.JSON)
  }

  return (
    <>
      <Box
        style={{
          height: '700px',
          outlineColor: theme.palette.grey[300],
        }}
        sx={{ outline: 1 }}
      >
        {/* White box to overlay missing license problem */}
        <SurveyCreatorComponent creator={creator} />

        <Box sx={{ mb: 10 }}>
          <Button
            fullWidth
            sx={{ zIndex: 5, height: '50px', color: 'white' }}
            variant="contained"
            onClick={() =>
              props.isUpdate ? handleUpdate() : setCreateDialog(true)
            }
          >
            Save
          </Button>
        </Box>
        <QuestionnaireTitleDialog
          open={createDialog}
          setOpen={setCreateDialog}
          onSave={handleCreate}
        />
      </Box>
    </>
  )
}

export default SurveyCreatorWidget
