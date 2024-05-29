import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ExportButton from '../ExportButton' // Adjust the import path
import type { ExperimentAnswers } from '@renderer/src/lib/types'
import { toast } from 'sonner'

const AnalyticsTab = () => {
  const router = useRouter()
  const [experimentAnswers, setExperimentAnswers] = useState<
    ExperimentAnswers[] | undefined
  >(undefined)

  useEffect(() => {
    const fetchAnswers = () => {
      window.ipc.send('getExperimentAnswers', {
        experimentID: router.query.id,
      })
    }

    window.ipc.on('getExperimentAnswers', (answers: ExperimentAnswers[]) => {
      setExperimentAnswers(answers)
    })

    window.ipc.on('failGetExperimentAnswers', (message: string) => {
      toast.error(message)
    })

    if (experimentAnswers === undefined) {
      fetchAnswers()
    }

    return () => {
      window.ipc.removeAllListeners('getExperimentAnswers')
      window.ipc.removeAllListeners('failGetExperimentAnswers')
    }
  }, [experimentAnswers, router.query.id])

  useEffect(() => {
    console.log(experimentAnswers)
  }, [experimentAnswers])

  return (
    <div>
      <h2>Analytics</h2>
      <h3>Download questionnaire answer data below</h3>
      <ExportButton />
    </div>
  )
}

export default AnalyticsTab
