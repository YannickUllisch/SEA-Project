import { useRouter } from 'next/router'
import React from 'react'
import ExportButton from '../ExportButton' // Adjust the import path

const AnalyticsTab = () => {
  const router = useRouter()
  return (
    <div>
      <h2>Analytics</h2>
      <h3>Download questionnaire answer data below</h3>
      <ExportButton />
    </div>
  )
}

export default AnalyticsTab
