import { FC, PropsWithChildren } from "react"
import router from "next/router";
import Image from 'next/image'
import { context } from '../../../store';
import { IItems } from "../../../services/types"
import Styles from './index.module.scss'

interface ICard {
    data: IItems,
    isProfile?: boolean
}

const CardComponent: FC<PropsWithChildren<ICard>> = ({data, isProfile = true}) => {
    const ctx = context()
    const defaultImg = 'https://images.pexels.com/photos/1820559/pexels-photo-1820559.jpeg?auto=compress&cs=tinysrgb&w=600'

    const redirectDetails = (dataItems: IItems) => {
        ctx.dispatch({
            urlRepo: dataItems.repos_url,
            AvatarRepo: dataItems.avatar_url,
            UsernameRepo: dataItems.login
        })
        router.push("/detail")
    }

    return (
        <div className={`w-full max-w-lg py-3 flex flex-row items-center justify-center mx-auto bg-[#FFFBFB] rounded-lg shadow-xl ${Styles.card_container}`}>
            <div className="flex flex-col md:flex-row w-3/4 md:w-5/6 space-x-0 md:space-x-8">
                <div className="w-full w-1/4 flex flex-col items-center justify-center">
                    <figure className="w-1/2 md:w-full  rounded-full overflow-hidden">
                        <Image
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
                    </div>
                </div>
            </div>
            {isProfile &&
                <div className={Styles.hidden_arrow} onClick={(() => redirectDetails(data))}>
                    <div className={Styles.hidden_arrow_content}>
                        More Info -&gt;
                    </div>
                </div>}
        </div>
    )
}

export default CardComponent