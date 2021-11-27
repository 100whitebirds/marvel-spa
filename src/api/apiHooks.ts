import { useQuery } from 'react-query'
import { useParams } from 'react-router'

const apikey = localStorage.getItem('publicKey')

export const useComics = (searchTerm: any, limit: any, offset: any) => {
  return useQuery<any, Error>([searchTerm, limit], async (searchTerm) => { // ???
    const url = searchTerm.queryKey[0]
      ? `https://gateway.marvel.com/v1/public/comics?apikey=${apikey}&titleStartsWith=${searchTerm.queryKey[0]}&limit=${limit}&offset=${offset}`
      : `https://gateway.marvel.com/v1/public/comics?apikey=${apikey}&limit=${limit}&offset=${offset}`
    const res = await fetch(url)

    if (!res.ok) {
      if (res.status === 401 || 403){
        localStorage.removeItem('publicKey')
        throw new Error('invalid public key')
      }
      throw new Error('failed to fetch comics')
    }
    return res.json()
  })
}

export const useComic = () => {
  const { comicId } = useParams()
  return useQuery<any, Error>('comic', async () => { // ???
    const res = await fetch(`/v1/public/comics/${comicId}?apikey=${apikey}`)
    if (!res.ok) {
      if (res.status === 401 || 403) {
        localStorage.removeItem('publicKey')
        throw new Error('invalid public key')
      }
      throw new Error('failed to fetch comic')
    }
    return res.json()
  })
}

export const useCreator = () => {
  const { creatorId } = useParams()
  return useQuery<any, Error>('creator', async () => { // ???
    const res = await fetch(`/v1/public/creators/${creatorId}?apikey=${apikey}`)
    if (!res.ok) {
      if (res.status === 401 || 403) {
        localStorage.removeItem('publicKey')
        throw new Error('invalid public key')
      }
      throw new Error('failed to fetch author')
    }
    return res.json()
  })
}

export const useCharacter = () => {
  let { characterId } = useParams()
  return useQuery<any, Error>('character', async () => { // ???
    const res = await fetch(`/v1/public/characters/${characterId}?apikey=${apikey}`)
    if (!res.ok) {
      if (res.status === 401 || 403) {
        localStorage.removeItem('publicKey')
        throw new Error('invalid public key')
      }
      throw new Error('failed to fetch character')
    }
    return res.json()
  })
}