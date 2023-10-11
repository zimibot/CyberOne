import { listCountryJson } from "../../assets/nameCountry"
import { formatBytes, formatNumber } from "../../helpers"
import { Cards } from "../cards"
import { Image, TitleItem } from "../main"

export const TrafficCard = ({ data = [], type = "requests", src }) => {
    const countryName = listCountryJson()
    return (
        <div className="space-y-2">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {data.map((d, k) => {
                    var filterednames = countryName.filter(function (obj) {
                        return obj.code === d.key
                    });
                    return <Cards key={k} classItem="flex justify-between gap-3 items-center">
                        <div>
                            <TitleItem>
                                {type === "bytes" ? formatBytes(d[type]) : formatNumber(d[type], 2)}
                            </TitleItem>
                        </div>
                        {!src ?
                            <Image id={d.key.toLowerCase()} text={filterednames[0].name} /> : <Image src={`./images/botIcon/${d.key}.png`} text={d.key} />
                        }
                    </Cards>
                })}

            </div>
        </div>
    )
}