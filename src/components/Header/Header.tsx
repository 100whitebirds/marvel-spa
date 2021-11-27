import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router'
import s from './Header.module.scss'

export const Header = () => {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('publicKey')
    navigate('/login')
    window.location.reload()
  }

  return (
    <div className={s.headerContainer}>
      <div className={s.logoutButton}>
        <Button variant="outlined" onClick={logout}>Log out</Button>
      </div>
    </div>
  )
}
