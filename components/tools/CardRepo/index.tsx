import { FC, PropsWithChildren } from "react"
import { redirectToNewPage, limitAddressDisplay } from "../../../helper"
import Styles from './index.module.scss'

interface ICardRepo {
    data: any,
    isProfile?: boolean
}

const CardRepoComponent: FC<PropsWithChildren<ICardRepo>> = ({data}) => (
    <div
        className={`w-full max-w-lg py-16 flex flex-row items-center justify-center mx-auto bg-[#FFFBFB] rounded-lg shadow-xl ${Styles.card_container}`}
        onClick={() => redirectToNewPage(data.html_url, true)}
    >
        <div className="flex flex-col md:flex-row w-3/4 md:w-5/6 space-x-0 md:space-x-8">
            <div className="w-full md:w-3/5 space-y-4 flex flex-col justify-center items-start">
                <div className="flex flex-col">
                    {/* <h3 className="text-center md:text-left text-2xl font-bold text-gray-900">{limitAddressDisplay(data.full_name, 40)}</h3> */}
                    <h3 className="text-center md:text-left text-2xl font-bold text-gray-900">{data.full_name}</h3>
                </div>
            </div>
        </div>
        <div className={Styles.hidden_arrow}>
            <div className={Styles.hidden_arrow_content}>
                More Info -&gt;
            </div>
        </div>
    </div>
)

export default CardRepoComponent