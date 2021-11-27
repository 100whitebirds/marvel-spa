import React from 'react'
import { ICreator } from '../../types/ICreator'
import { ICharacter } from '../../types/ICharacter'
import { Link } from 'react-router-dom'
import s from './ComicForHomePage.module.scss'


interface Props {
  id: string
  cover: {
    path: string
    extension: string
  }
  title: string
  series: string
  creators: ICreator[]
  characters: ICharacter[]
}

export const ComicForHomePage:React.FC<Props> = ({id, cover, title, series, creators, characters}) => {
  const creatorsByName = creators.map((c, i) => [ 
    i > 0 && ", ", 
    <Link className={s.creatorsList} key={i} to={`/creators/${c.resourceURI.split("creators/")[1]}`}>{c.name}</Link>
  ])

  const charactersByName = characters.map((c, i) => [
    i > 0 && ", ",
    <Link className={s.charactersList} key={i} to={`/characters/${c.resourceURI.split("characters/")[1]}`}>{c.name}</Link>
  ])

  return (
    <div className={s.comicForHomePageContainer}>
      <img src={cover.path + '.' + cover.extension} alt="" />
      <span>
        #{id}
      </span>
      <h1>
        {title}
      </h1>
      <h1>
        {series}
      </h1>
      <h2>
        Characters: {charactersByName}
      </h2>
      <h2>
        Creators: {creatorsByName}
      </h2>
    </div>
  )
}


