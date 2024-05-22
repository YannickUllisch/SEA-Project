// // import React, { useState } from 'react'
// // import { Button, TextField, Box } from '@mui/material'

// // // State to keep track of the entered code
// // const Restart = ({ resetSurvey }) => {
// //   const [code, setCode] = useState('')

// //   // Function to handle the reset action
// //   const handleReset = () => {
// //     if (code === '123') {
// //       resetSurvey()
// //       setCode('')
// //     }
// //   }

// //   return (
// //     <Box
// //       sx={{
// //         display: 'flex',
// //         flexDirection: 'column',
// //         alignItems: 'center',
// //         marginTop: 2,
// //       }}
// //     >
// //       <TextField
// //         label="Enter Reset Code"
// //         value={code}
// //         onChange={(e) => setCode(e.target.value)}
// //       />
// //       <Button
// //         variant="contained"
// //         color="primary"
// //         onClick={handleReset}
// //         sx={{ marginTop: 1 }}
// //       >
// //         Reset Survey
// //       </Button>
// //     </Box>
// //   )
// // }

// // export default Restart

import React, { useState } from 'react'
import { Button, TextField, Box } from '@mui/material'

// State to keep track of the entered code
const Restart = ({ redirectToHomePage }) => {
  const [code, setCode] = useState('')

  // Function to handle the redirection to participant's homepage
  const handleRedirect = () => {
    if (code === '123') {
      redirectToHomePage()
      setCode('')
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 2,
      }}
    >
      <TextField
        label="Enter Reset Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleRedirect}
        sx={{ marginTop: 1 }}
      >
        Go to Home Page
      </Button>
    </Box>
  )
}

export default Restart
