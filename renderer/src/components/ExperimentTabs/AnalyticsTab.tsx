import { useRouter } from 'next/router'
import React from 'react'
import ExportButton from '../ExportButton' // Adjust the import path

const AnalyticsTab = () => {
  const router = useRouter()
  return (
    <div>
      <h2>Analytics {router.query.id}</h2>
      <ExportButton />
    </div>
  )
}

export default AnalyticsTab
