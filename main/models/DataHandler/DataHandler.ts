import { parse } from 'json2csv'

export function exportToCSV(data: any[]): string {
  const fields = [
    'id',
    'version',
    'question',
    'response',
    'age',
    'gender',
    'country',
  ]
  const opts = { fields }
  try {
    return parse(data, opts)
  } catch (err) {
    console.error(err)
    throw err
  }
}
