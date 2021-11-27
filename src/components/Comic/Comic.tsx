import React from 'react'
import { Link } from 'react-router-dom'
import { useComic } from '../../api/apiHooks'
import { ICharacter } from '../../types/ICharacter'
import { ICreator } from '../../types/ICreator'
import { BackButton } from '../common/BackButton'
import s from './Comic.module.scss'


export const Comic: React.FC = () => {
  const { data, error, isLoading, isError } = useComic()

  let comicId, comicTitle, comicSeries, comicImagePath, comicImageExtension, comicCreators, comicCharacters
  
  if (!isLoading) {
    comicId = data.data.results[0].id
    comicTitle = data.data.results[0].title
    comicSeries = data.data.results[0].series.name
    comicImagePath = data.data.results[0].thumbnail.path
    comicImageExtension = '.' + data.data.results[0].thumbnail.extension
    comicCreators = data.data.results[0].creators.items.map((c: ICreator, i: number) => [
      i > 0 && ", ",
      <Link className={s.creatorsList} key={i} to={`/creators/${c.resourceURI.split("creators/")[1]}`}>{c.name}</Link>
    ])
    comicCharacters = data.data.results[0].characters.items.map((c: ICharacter, i: number) => [
      i > 0 && ", ",
      <Link className={s.charactersList} key={i} to={`/characters/${c.resourceURI.split("characters/")[1]}`}>{c.name}</Link>
    ])
  }

  return (
    <div className={s.comicContainer}>
      <div>
        <img src={comicImagePath + comicImageExtension} alt="" />
      </div>
      <span>
        #{comicId}
      </span>
      <h1>
        {comicTitle}
      </h1>
      <div>
        <h2>
          Series: {comicSeries}
        </h2>
        <h2>
          Creators: {comicCreators}
        </h2>
        <h2>
          Characters: {comicCharacters}
        </h2>
      </div>
      <div className={s.backButton}>
        <BackButton />
      </div>
    </div>
  )
}
