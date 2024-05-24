import React, { useState, useEffect } from 'react'
import { TextField, Button, Box } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'

import 'survey-core/defaultV2.min.css'
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import { useRouter } from 'next/router'
import Restart from '../src/components/restart'
import type { FrontendQuestionnaire } from '@renderer/src/lib/types'
import countries from 'renderer/pages/admin/demograhicsData/countries.json'
import genders from 'renderer/pages/admin/demograhicsData/genders.json'

const SurveyPage = () => {
  const router = useRouter()

  const [currQuestionnaire, setCurrQuestionnaire] = useState<
    FrontendQuestionnaire | undefined
  >(undefined)

  const [surveyModel, setSurveyModel] = useState<Model>(new Model())
  const [demographicsActive, setDemographicsActive] = useState<boolean>(true)
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [country, setCountry] = useState('')

  // Used to check if questionnaire is completed
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    window.ipc.send('initRandomQuestionnaire', {
      experimentID: router.query.executedExperiment as string,
    })

    window.ipc.on(
      'initRandomQuestionnaire',
      (questionnaire: FrontendQuestionnaire) => {
        setCurrQuestionnaire(questionnaire)
        const surveyModel = new Model(JSON.parse(questionnaire.form))
        surveyModel.showTitle = false
        setSurveyModel(surveyModel)
      },
    )
  }, [currQuestionnaire === undefined])

  useEffect(() => {
    if (surveyModel) {
      surveyModel.addNavigationItem({
        title: 'Exit',
      })

      surveyModel.onComplete.add((sender) => {
        console.log(JSON.stringify(sender.data))

        window.ipc.send('saveQuestionnaire', {
          questionnaireID: currQuestionnaire.id,
          questionnaireAnswerData: sender.data,
          age: Number.parseInt(age),
          gender,
          country,
        })

        setIsCompleted(true)
      })
    }
  }, [surveyModel, age, gender, country])

  const handleDemographicsSubmit = (event) => {
    event.preventDefault()
    setDemographicsActive(false)
  }

  const redirectToHomePage = () => {
    router.push({
      pathname: '/participant',
      query: { executedExperiment: router.query.executedExperiment as string },
    })
  }

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {demographicsActive ? (
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pt: 3,
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleDemographicsSubmit}
        >
          <TextField
            required
            id="age-demographics"
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            helperText="Please select your age"
          />
          <TextField
            required
            id="gender-demographics"
            select
            label="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            helperText="Please select your gender"
          >
            {genders.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            id="country-demographics"
            select
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            helperText="Please select your location"
          >
            {countries.map((option) => (
              <MenuItem key={option.name} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      ) : (
        <Survey model={surveyModel} />
      )}

      {isCompleted && <Restart redirectToHomePage={redirectToHomePage} />}
    </Box>
  )
}

export default SurveyPage
