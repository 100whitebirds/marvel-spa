import React from 'react'
import { Alert, AlertTitle } from '@mui/material'
import { useNavigate } from 'react-router'

interface Props {
  message: string
}

export const ErrorAlert:React.FC<Props> = ({message}) => {
  // const navigate = useNavigate() // ???
  // if (message === "invalid public key") navigate('/login') //???
  return (
      <Alert severity="error">
        <AlertTitle>Error: </AlertTitle>
        <strong>{message}</strong>
      </Alert> 
  )
}
