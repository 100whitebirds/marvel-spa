import React, { useState } from 'react'
import md5 from 'md5'
import { Button, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { ErrorAlert } from '../common/ErrorAlert'
import s from './Login.module.scss'

export const Login: React.FC = () => {
  const [error, setError] = useState()
  const navigate = useNavigate()
  // ???
  // const authenticate = async (timestamp: string, publicKey: string, hash: string) => {
    // const res = await fetch(`/v1/public/comics?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`)
  const authenticate = async (publicKey: string) => {
    try {
      const res = await fetch(`/v1/public/comics?apikey=${publicKey}`)
      if (!res.ok) {
        throw new Error
      }
      localStorage.setItem('publicKey', publicKey)
      navigate('/')
      window.location.reload()
    } catch(e) {
      setError(e)
    }
  }

  const { control, handleSubmit } = useForm({
    defaultValues: {
      publicKey: '',
      privateKey: ''
    }
  })

  const onSubmit = (data: any) => {
    const publicKey = data.publicKey
    const privateKey = data.privateKey
    // ???
    // const date = new Date
    // const timestamp = String(date)
    // const hashForQuery = md5(timestamp + publicKey + privateKey)
    // authenticate(timestamp, publicKey, hashForQuery)
    authenticate(publicKey)
  }

  return (
    <div className={s.container}>
      {error && <ErrorAlert message="failed to authenticate credentials"/>}

      <h1 className={s.tag}>Sign in</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.textField}>
          <Controller
            name="publicKey"
            control={control}
            render={({ field }) => 
              <TextField
                className="textField"
                id="publicKey"
                label="Public key"
                type="publicKey"
                {...field}
              />}
          />
        </div>
        <div className={s.textField}>
          <Controller
            name="privateKey"
            control={control}
            render={({ field }) =>
              <TextField
                className="textField"
                id="privateKey"
                label="Private key"
                type="privateKey"
                {...field}
              />}
          />
        </div>
        <div className={s.submitButton}>
          <Button type="submit" variant="contained"> Sign in</Button>
        </div>
      </form>
    </div>
  )
}