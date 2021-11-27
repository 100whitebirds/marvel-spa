import React from 'react'
import { useNavigate } from "react-router-dom"
import { styled } from '@mui/material/styles'
import Button, { ButtonProps } from '@mui/material/Button'
import { purple } from '@mui/material/colors'

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[200],
  '&:hover': {
    backgroundColor: purple[500],
  },
}))

export const BackButton = () => {
  const navigate = useNavigate()
  return (
    <ColorButton variant="contained" size="small" onClick={() => navigate(-1)}>Previous Page</ColorButton>
  )
}

