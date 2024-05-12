import { useRouter } from 'next/router'
import React from 'react'

const AnalyticsTab = () => {
  const router = useRouter()
  return <div>Analytics {router.query.id}</div>
}

export default AnalyticsTab
