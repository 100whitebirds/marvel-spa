import React from 'react'
import {
  Routes,
  Route,
  Navigate
} from "react-router"
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import { Login } from './components/Login/Login'
import { Home } from './components/Home/Home'
import { Creator } from './components/Creator/Creator'
import { Character } from './components/Character/Character'
import { Comic } from './components/Comic/Comic'

function App() {
  const queryClient = new QueryClient()
  const auth = localStorage.getItem('publicKey')
  return (  
    <>
      {
        auth ?
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/comics/:comicId" element={<Comic/>}/>
              <Route path="/creators/:creatorId" element={<Creator />}/>
              <Route path="/characters/:characterId" element={<Character />}/>
            </Routes>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        : 
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
          </Routes>
      }
    </>
  )
}

export default App
