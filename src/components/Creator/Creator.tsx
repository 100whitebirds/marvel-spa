import React from 'react'
import { Link } from "react-router-dom"
import { useCreator } from '../../api/apiHooks'
import { IComic } from '../../types/IComic'
import { BackButton } from '../common/BackButton'
import s from './Creator.module.scss'

export const Creator:React.FC = () => {
  const { data, error, isLoading, isError } = useCreator()
  
  let creatorId, creatorName, creatorImagePath, creatorImageExtension, creatorComics

  if (!isLoading) {
    creatorId = data.data.results[0].id
    creatorName = data.data.results[0].fullName
    creatorImagePath = data.data.results[0].thumbnail.path
    creatorImageExtension = '.' + data.data.results[0].thumbnail.extension
    creatorComics = data.data.results[0].comics.items.map((c: IComic, i: number) => [
      i > 0 && ", ",
      <Link className={s.comicsList} key={i} to={`/comics/${c.resourceURI.split("comics/")[1]}`}>{c.name}</Link>
    ])
  }
  
  return (
    <div className={s.creatorContainer}>
      <div>
        <img src={creatorImagePath + creatorImageExtension} alt="" />
      </div>
      <span>#{creatorId}</span>
      <h1>{creatorName}</h1>
      <h2>
        Comics: {creatorComics}
      </h2>
      <div className={s.backButton}>
        <BackButton />
      </div>
    </div>
  )
}

