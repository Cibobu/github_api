import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
// import { useDebounce } from '../helper'
import { getListGithub } from '../services'
import { IItems } from '../services/types'
import { Github } from '../public'
import CardComponent from '../components/tools/Card'
import Button from '../components/tools/Button'
import Loading from '../components/tools/Loading'

const Details: NextPage = () => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isEnd, setIsEnd] = useState<boolean>(true)
  const [val, setVal] = useState<string>("zororaka")
  const [page, setPage] = useState<number>(1)
  const [listGithub, setListGithub] = useState<Array<IItems> | null>(null)

  const firstInit = (page = 1) => {
    setPage(page)
    setIsLoading(true)
    setIsEnd(true)
    getListGithub(`?q=${val}&per_page=9&page=${page}`)
    .then((response) => {
      setIsLoading(false)
      if (page === 1) {
        setListGithub(response.data.items)
      } else if (response.data.items.length && listGithub) {
        console.log('dia');
        setListGithub(Array.from(listGithub).concat(response.data.items))
      }
      if (response.data.items.length < 9) setIsEnd(false)
    })
    .catch((error) => {
      setIsLoading(false)
      console.log(error)
    })
  }

  useEffect(firstInit, [])

  return (
    <header>
      <div className="text-center bg-gray-50 text-gray-800 py-20 px-6">
        <div>
          <Github />
        </div>
        <h1 className="text-5xl font-bold mt-0 mb-6">Welcome to Github</h1>
        <h5 className="text-3xl font-bold mb-8">You can search user github here's</h5>
        <div className="flex justify-center">
          <div className="mb-3 w-2/4">
            <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
              <input
                type="search"
                className="form-control w-3/4 mr-2 relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Search user"
                aria-label="Search"
                aria-describedby="button-addon3"
                value={val}
                onChange={(e) => setVal(e.target.value)}
              />
              <Button typeButton='button' children='Search' onClick={() => firstInit(1)} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 justify-center mr-5 ml-5 gap-4">
          {listGithub?.map((dataUserGithub) => (
            <div key={dataUserGithub.id}>
              <CardComponent data={dataUserGithub} />
            </div>
          ))}
        </div>
        {isLoading ? <Loading /> :
          <>
            {isEnd &&
              <div className="mt-16 w-full">
                <Button typeButton='button' children='Load more' onClick={() => firstInit(page+1)} />
              </div>
            }
          </>
        }
      </div>
    </header>
  )
}

export default Details
