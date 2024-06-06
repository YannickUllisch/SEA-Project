import { ipcMain, dialog, Notification } from 'electron'
import QuestionnaireManager from '@main/models/Questionnaire/QuestionnaireManager'
import fs from 'node:fs'

ipcMain.on('generate-csv', async (event, arg) => {
  const { experimentId } = arg

  try {
    // Open a save dialog to let the user choose the export location
    const { canceled, filePath } = await dialog.showSaveDialog({
      title: 'Save CSV File',
      defaultPath: 'export.csv',
      filters: [
        { name: 'CSV Files', extensions: ['csv'] },
        { name: 'All Files', extensions: ['*'] },
      ],
    })

    if (canceled || !filePath) {
      event.reply('failGenerateCSV', 'CSV export canceled')
      return
    }

    const csvContent = await QuestionnaireManager.exportAllAnswers(experimentId)

    // Write the CSV content to the selected file path
    await fs.promises.writeFile(filePath, csvContent)

    new Notification({
      title: 'Export Success',
      body: `CSV file created at: ${filePath}`,
    }).show()
    event.reply('generatedCSV', filePath)
  } catch (error) {
    console.error('Error generating CSV:', error)
    new Notification({
      title: 'Export Failure',
      body: `Error: ${error.message || 'Unknown error'}`,
    }).show()
    event.reply('failGenerateCSV', error.message || 'Unknown error')
  }
})
