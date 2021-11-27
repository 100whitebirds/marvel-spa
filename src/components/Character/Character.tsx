import React from 'react'
import { Link } from 'react-router-dom'
import { useCharacter } from '../../api/apiHooks'
import { IComic } from '../../types/IComic'
import { BackButton } from '../common/BackButton'
import s from './Character.module.scss'

export const Character: React.FC = () => {
  const { data, error, isLoading, isError } = useCharacter()

  let characterId, characterName, characterImagePath, characterImageExtension, characterComics 

  if(!isLoading) {
    characterId = data.data.results[0].id
    characterName = data.data.results[0].name
    characterImagePath = data.data.results[0].thumbnail.path   
    characterImageExtension = '.' + data.data.results[0].thumbnail.extension
    characterComics = data.data.results[0].comics.items.map((c: IComic, i: number) => [
      i > 0 && ", ",
      <Link className={s.comicsList} key={i} to={`/comics/${c.resourceURI.split("comics/")[1]}`}>{c.name}</Link>
    ])    
  }

  return (
    <div className={s.characterContainer}>
      <div className={s.characterImage}>
        <img src={characterImagePath + characterImageExtension} alt="" />
      </div>
      <span>
        #{characterId}
      </span>
      <h1>
        {characterName}
      </h1>
      <h2>
        Comics: {characterComics}
      </h2>
      <div className={s.backButton}>
        <BackButton />
      </div>
    </div>
  )
}
