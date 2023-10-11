import { Cards } from "./cards"
import AmMaps from "./maps/am4-maps"
import { CountryItem } from "./country"
export const TitleItem = ({ children }) => {
    return <div className="text-4xl">
        {children}
    </div>
}

export const SubTitleItem = ({ children, timeText }) => {
    return <div>
        <div className="font-bold">
            {children}
        </div>
        {timeText &&
            <div>
                {timeText}
            </div>
        }
    </div>
}

export const Image = ({ text, src, id }) => {
    return <div className="flex flex-col gap-2 justify-center items-center">
        {src ?
            <img className="rounded-lg h-14 w-14 object-cover" src={src} /> : <CountryItem className={id} />
        }
        <div>{text}</div>
    </div>
}

export const MapsTraffic = ({ id, mapsData }) => {
    return <Cards classItem="w-full min-h-[500px] relative p-0">
        <AmMaps id={id} otherData={mapsData}></AmMaps>
    </Cards>
}