import { PrismaClient } from '@prisma/client'
import { ipcMain } from 'electron'
import * as fs from 'fs'
import * as path from 'path'
import * as csvWriter from 'csv-writer'
import * as XLSX from 'xlsx'

const prisma = new PrismaClient()

const getData = async () => {
  return await prisma.dbQuestionnaireAnswers.findMany()
}

const generateCSV = async (data: any[]) => {
  const csvPath = path.join(__dirname, '../../output/answers.csv')
  const createCsvWriter = csvWriter.createObjectCsvWriter
  const csvWriterInstance = createCsvWriter({
    path: csvPath,
    header: [
      { id: 'id', title: 'ID' },
      { id: 'questionnaireId', title: 'Questionnaire ID' },
      { id: 'answers', title: 'Answers' },
    ],
  })
  await csvWriterInstance.writeRecords(data)
  return csvPath
}

const generateXLSX = async (data: any[]) => {
  const xlsxPath = path.join(__dirname, '../../output/answers.xlsx')
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Answers')
  XLSX.writeFile(workbook, xlsxPath)
  return xlsxPath
}

ipcMain.handle('generate-csv', async () => {
  const data = await getData()
  return await generateCSV(data)
})

ipcMain.handle('generate-xlsx', async () => {
  const data = await getData()
  return await generateXLSX(data)
})
