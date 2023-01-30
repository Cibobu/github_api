import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { context } from '../store';
import { getListGithub } from '../services'
import { IItems } from '../services/types'
import CardComponent from '../components/tools/CardRepo'
import Button from '../components/tools/Button'
import Loading from '../components/tools/Loading'
import axios from 'axios';
import { instance as nonGuardInstance } from '../services/instance'

const Details: NextPage = () => {
  const ctx = context()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isEnd, setIsEnd] = useState<boolean>(true)
  const [val, setVal] = useState<string>("zororaka")
  const [page, setPage] = useState<number>(1)
  const [listGithub, setListGithub] = useState([])

  const firstInit = () => {
    if (ctx.state.urlRepo) {
      nonGuardInstance.get(ctx.state.urlRepo)
      .then((res) => {
        console.log('res.data :', res.data)
        setListGithub(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
    } else {
      router.push('/')
    }
  }

  useEffect(firstInit, [])

  const defaultImg = 'https://images.pexels.com/photos/1820559/pexels-photo-1820559.jpeg?auto=compress&cs=tinysrgb&w=600'

  return (
    <header>
      <div className="text-center bg-gray-50 text-gray-800 py-20 px-6">
        <div className="w-full flex flex-col items-center justify-center mb-6">
          <figure className="w-1/2 md:w-full rounded-full overflow-hidden">
            <Image
              src={ctx.state.AvatarRepo ? ctx.state.AvatarRepo : defaultImg}
              alt="Picture of the author"
              width={250}
              height={250}
              className="rounded-full"
            />
          </figure>
        </div>
        <h1 className="text-5xl font-bold mt-0 mb-6">{ctx.state.UsernameRepo}</h1>
        <h4 className="text-5xl font-bold mt-0 mb-6">Here is user repo list</h4>
        <div className="flex justify-center">
          <div className="mb-3 w-full">
            <Button typeButton='button' children='Back To Homepage' onClick={() => router.push('/')} />
          </div>
        </div>
        <div className="grid grid-cols-3 justify-center mr-5 ml-5 gap-4">
          {listGithub?.map((dataUserGithub, index) => (
            <div key={index}>
              <CardComponent data={dataUserGithub} />
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Details
