import React, { SyntheticEvent, useState } from 'react'
import Loader from 'react-loader-spinner'
import { ComicForHomePage } from '../Comic/ComicForHomePage'
import { Header } from '../Header/Header'
import { TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { InfiniteScroll } from './InfiniteScroll'
import s from './Home.module.scss'
import { useComics } from '../../api/apiHooks'
import { ErrorAlert } from '../common/ErrorAlert'


export const Home:React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [limit, setLimit] = useState(20)
  const [offset, setOffset] = useState(0)
  
  const { data, error, isLoading, isError } = useComics(searchTerm, limit, offset)

  if (error) {
    return <ErrorAlert message={error.message} />
  }

  let comicsElements
  if (!isLoading) {
    comicsElements = data.data.results
  }

  // const handleChange = (e: SyntheticEvent) => {
  const handleChange = (e: any) => { // ???
    setTimeout(() => {
      setSearchTerm(e.target.value)
    }, 1000)
  }

  const loadMoreComics = () => {
    setLimit(limit => limit + 20)
    setOffset(offset => offset + 20)
  }

  return <>
    <Header />
    <div className={s.homeContainer}>
      <div className={s.searchInput}>
        <TextField
          className="searchInput"
          id="searchInput"
          placeholder="Find comic by name"
          type="searchInput"
          onChange={handleChange}
          />
        <div className={s.searchIcon}>
          <SearchIcon />
        </div>
      </div>
      <div className={s.comicsContainer}>
        {/* <InfiniteScroll
          hasMoreData={true}
          loadOnMount={true}
          isLoading={isLoading}
          onBottomHit={loadMoreComics}
        > */}
          {comicsElements ?
            comicsElements.filter((item: any) => {
              if (searchTerm === '') {
                return item
              } else if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                return item
              }
             
            }).map((c: any, index: number) => { // ???
              if (comicsElements.length === index + 1) {
                return (
                  <div key={c.id}>
                    <ComicForHomePage
                      id={c.id}
                      cover={c.thumbnail}
                      title={c.title}
                      series={c.series.name}
                      creators={c.creators.items}
                      characters={c.characters.items}
                    />
                  </div>
                )
              } else {
                return (
                  <div key={c.id}>
                    <ComicForHomePage 
                      id={c.id}
                      cover={c.thumbnail}
                      title={c.title}
                      series={c.series.name}
                      creators={c.creators.items}
                      characters={c.characters.items} 
                    />
                  </div>
                )
              } 
            })
          : <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} timeout={500} />
          }
        {/* </InfiniteScroll> */}
      </div>
    </div>
  </>
}