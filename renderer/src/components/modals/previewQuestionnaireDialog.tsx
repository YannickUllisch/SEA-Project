import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { useEffect, useState, type FC } from 'react'
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import 'survey-core/defaultV2.min.css'

interface PreviewDialogProps {
  stringifiedJSON: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const PreviewQuestionnaireDialog: FC<PreviewDialogProps> = ({
  stringifiedJSON,
  setOpen,
  open,
}) => {
  const [model, setModel] = useState<Model>(new Model())
  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (stringifiedJSON !== '') {
      const surveyModel = new Model(JSON.parse(stringifiedJSON))

      surveyModel.showCompletedPage = false
      surveyModel.showCompleteButton = false
      surveyModel.showTitle = false
      setModel(surveyModel)
    }
  }, [stringifiedJSON])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ '& .MuiDialog-paper': { width: '70%', maxWidth: 'none' } }}
    >
      <DialogTitle>Survey Preview</DialogTitle>
      <DialogContent>
        <Survey model={model} />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PreviewQuestionnaireDialog
