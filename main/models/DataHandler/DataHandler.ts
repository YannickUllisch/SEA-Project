import { parse } from 'json2csv'

export function exportToCSV(data: any[]): string {
  return parse(data)
}
