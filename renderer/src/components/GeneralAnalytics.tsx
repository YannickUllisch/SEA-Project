import React, { type FC, useMemo } from 'react'
import type { ExperimentAnswers } from '../lib/types'
import { Box, Typography } from '@mui/material'
import { BarChart, PieChart } from '@mui/x-charts'
import theme from '../lib/theme'

interface GeneralAnalyticsProps {
  answers: ExperimentAnswers[]
}

const GeneralAnalytics: FC<GeneralAnalyticsProps> = ({ answers }) => {
  const amountChartData = useMemo(() => {
    const rows: { amount: number; version: string }[] = []
    if (answers) {
      for (const answer of answers) {
        rows.push({ amount: answer.answers.length, version: answer.version })
      }
      return rows
    }
    return []
  }, [answers])

  const genderChartData = useMemo(() => {
    const genderCounts: { Female: number; Male: number; Other: number } = {
      Female: 0,
      Male: 0,
      Other: 0,
    }

    for (const answer of answers) {
      answer.answers.map((a) => {
        if (a.gender === 'Female') genderCounts.Female++
        if (a.gender === 'Male') genderCounts.Male++
        if (a.gender === 'Other') genderCounts.Other++
      })
    }

    const total = Object.values(genderCounts).reduce(
      (acc, count) => acc + count,
      0,
    )

    return Object.entries(genderCounts).map(([gender, count]) => ({
      value: count,
      label: `${gender} (${((count / total) * 100).toFixed(2)}%)`,
    }))
  }, [answers])

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        General Analytics
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <BarChart
          dataset={amountChartData}
          xAxis={[{ scaleType: 'band', dataKey: 'version' }]}
          series={[{ dataKey: 'amount', label: 'Answer Count' }]}
          width={350}
          height={350}
        />
        <PieChart
          series={[{ data: genderChartData }]}
          colors={[
            theme.palette.primary.light,
            theme.palette.primary.main,
            theme.palette.secondary.main,
          ]} // Using palette for colors
          width={350}
          height={350}
        />
      </Box>
    </Box>
  )
}

export default GeneralAnalytics
