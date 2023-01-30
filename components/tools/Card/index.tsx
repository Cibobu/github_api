import { FC, PropsWithChildren } from "react"
import Image from 'next/image'
import { IItems } from "../../../services/types"

interface ICard {
    data: IItems,
}

const CardComponent: FC<PropsWithChildren<ICard>> = ({data}) => {
    const defaultImg = 'https://images.pexels.com/photos/1820559/pexels-photo-1820559.jpeg?auto=compress&cs=tinysrgb&w=600'
    return (
        <div className='w-full max-w-lg py-3 flex flex-row items-center justify-center mx-auto bg-[#FFFBFB] rounded-lg shadow-xl'>
            <div className="flex flex-col md:flex-row w-3/4 md:w-5/6 space-x-0 md:space-x-8">
                <div className="w-full w-1/4 flex flex-col items-center justify-center">
                    <figure className="w-1/2 md:w-full  rounded-full overflow-hidden"><Image
                            src={data ? data.avatar_url : defaultImg}
                            alt="Picture of the author"
                            width={250}
                            height={250}
                        />
                    </figure>
                </div>
                <div className="w-full md:w-3/5 space-y-4 flex flex-col justify-center items-start">
                    <div className="flex flex-col">
                        <h1 className="text-center md:text-left text-2xl font-bold text-gray-900">{data.login}</h1>
                        {/* <p className="inline text-gray-700 font-normal leading-6 w-full text-base text-left">UX Researcher, Co-host of the Interesting Design podcast
                            and a proud mother of three children</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardComponent