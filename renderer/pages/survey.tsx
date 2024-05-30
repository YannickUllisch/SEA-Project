import React, { useState, useEffect, useRef } from 'react'
import {
  Box,
  Button,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import 'survey-core/defaultV2.min.css'
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import { useRouter } from 'next/router'
import Restart from '../src/components/restart'
import type { FrontendQuestionnaire } from '@renderer/src/lib/types'
import countries from '@renderer/pages/admin/demograhicsData/countries.json'
import genders from '@renderer/pages/admin/demograhicsData/genders.json'
import { set } from 'react-hook-form'

const SurveyPage = () => {
  const router = useRouter()
  const [currQuestionnaire, setCurrQuestionnaire] = useState<
    FrontendQuestionnaire | undefined
  >(undefined)
  const [surveyModel, setSurveyModel] = useState<Model>(new Model())

  // Handling demographics data
  const [demographicsActive, setDemographicsActive] = useState(true)
  const [age, setAge] = useState<string>('')
  const ageRef = useRef(age)
  const [gender, setGender] = useState<string>('')
  const genderRef = useRef(gender)
  const [country, setCountry] = useState<string>('')
  const countryRef = useRef(country)
  const [gdprConsent, setGdprConsent] = useState<boolean>(false)

  const [ageError, setAgeError] = useState('')
  const [genderError, setGenderError] = useState('')
  const [countryError, setCountryError] = useState('')
  const [gdprError, setGdprError] = useState('')

  useEffect(() => {
    genderRef.current = gender
    ageRef.current = age
    countryRef.current = country
  }, [gender, country, age])
  // Used to check if questionnaire is completed
  const [isCompleted, setIsCompleted] = useState(false)

  const handleDemographicsSubmit = (e) => {
    e.preventDefault()
    let valid = true

    // Reset errors
    setAgeError('')
    setGenderError('')
    setCountryError('')
    setGdprError('')

    // Validate age
    if (!age) {
      setAgeError('Please enter a valid age.')
      valid = false
    }

    // Validate gender
    if (!gender) {
      setGenderError('Please select your gender.')
      valid = false
    }

    // Validate country
    if (!country) {
      setCountryError('Please select your location.')
      valid = false
    }

    if (!gdprConsent) {
      setGdprError('Please agree to the GDPR consent.')
      valid = false
    }

    if (valid) {
      setDemographicsActive(false)
    }
  }

  useEffect(() => {
    const fetchRandomQuestionnaire = () => {
      // This will return us a random questionnaire based on the experiment found using the executedExperiment ID given as a query parameter.
      if ((router.query.executedExperiment as string) === undefined) {
        router.push('/')
      }
      window.ipc.send('initRandomQuestionnaire', {
        experimentID: router.query.executedExperiment as string,
      })
    }

    // The response we get is a randomized questionnaire from the executed experiment.
    window.ipc.on(
      'initRandomQuestionnaire',
      (questionnaire: FrontendQuestionnaire) => {
        setCurrQuestionnaire(questionnaire)
        const surveyModel = new Model(JSON.parse(questionnaire.form))
        surveyModel.showTitle = false
        setSurveyModel(surveyModel)
      },
    )

    if (currQuestionnaire === undefined) {
      fetchRandomQuestionnaire()
    }
  }, [currQuestionnaire, router.query, router])

  // Use useEffect to add a navigation item once the survey model is set up
  useEffect(() => {
    if (surveyModel) {
      const exitExists = surveyModel.navigationBar.actions.find(
        (action) => action._title === 'Exit',
      )

      if (!exitExists) {
        surveyModel.addNavigationItem({
          title: 'Exit',
          action: () => surveyModel.doComplete(),
        })
      }

      surveyModel.onComplete.add((sender) => {
        window.ipc.send('saveQuestionnaire', {
          experimentID: router.query.executedExperiment as string,
          questionnaireID: currQuestionnaire.id,
          questionnaireAnswerData: sender.data,
          age: Number(ageRef.current),
          gender: genderRef.current,
          country: countryRef.current,
        })
        // Resetting Demographic states
        setAge('')
        setCountry('')
        setGender('')
        setGdprConsent(false)

        setIsCompleted(true)
      })
    }
  }, [surveyModel, currQuestionnaire, router.query.executedExperiment])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3,
      }}
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
            mt: 5,
            '& > :not(style)': { m: 1, width: '35ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleDemographicsSubmit}
        >
          <Typography variant="h4" align="center">
            Demographics
          </Typography>
          <TextField
            required
            label="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            helperText={ageError || 'Please select your age'}
            error={!!ageError}
          />
          <TextField
            required
            select
            label="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            helperText="Please select your gender"
            error={!!genderError}
          >
            {genders.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            select
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            helperText="Please select your location"
            error={!!countryError}
          >
            {countries.map((option) => (
              <MenuItem key={option.name} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <FormControlLabel
            required
            control={
              <Checkbox
                checked={gdprConsent}
                onChange={(e) => setGdprConsent(e.target.checked)}
              />
            }
            label="I accept the GDPR consent"
          />
          {gdprError && <Typography color="error">{gdprError}</Typography>}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!gdprConsent}
          >
            Submit
          </Button>
        </Box>
      ) : (
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pt: 3,
            mt: 5,
            '& > :not(style)': { m: 1, width: '35ch' },
          }}
        >
          {!isCompleted && (
            <Typography variant="h4" align="center">
              Survey
            </Typography>
          )}

          <Survey model={surveyModel} />
        </Box>
      )}

      {isCompleted && <Restart />}
    </Box>
  )
}

export default SurveyPage
