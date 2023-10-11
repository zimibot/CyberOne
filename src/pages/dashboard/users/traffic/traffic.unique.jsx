
import { useContext } from "react"
import { CardMultiple } from "../../../../components/dashboard/cardMultiple"
import { MapsTraffic, SubTitleItem } from "../../../../components/main"
import { TrafficCard } from "../../../../components/traffic/traffic.card"
import { formatNumber } from "../../../../helpers"
import MyContext from "../../../../helpers/contex"

export const TrafficUnique = ({ data}) => {
    const dopt = useContext(MyContext)
    const option = dopt.option
    const getOpt = option.getOptions
    let label = getOpt.fullDay.label
    let itemdata = data ? [
        {
            total: formatNumber(data.unique.totalUnique, 2),
            title: "Total Unique Visitors",
            date: label
        },
        {
            total: formatNumber(data.unique.uniqueMax, 2),
            title: "Maximum Unique Visitors",
            date: label
        },
        {
            total: formatNumber(data.unique.uniqueMin, 2),
            title: "Minimum Unique Visitors",
            date: label
        }] : null
    let maps = data ? data.maps.map(d => ({
        id: d.key,
        value: d.requests
    })) : []
    let topCountry = data ? data.topCountry : null
    return (
        <div className="flex-1 flex flex-col drop-shadow gap-4">
            <SubTitleItem timeText={label}>
                Requests Through Cloudflare
            </SubTitleItem>
            {data ? <CardMultiple ContentData={itemdata} chartData={data.customZone} multi={false} type={'uniques'} /> : <LoadMultiCard />}
            <SubTitleItem timeText={label}>
                Web Traffic Requests by Country
            </SubTitleItem>
            {data ? <MapsTraffic id={"uniqeu"} mapsData={maps}></MapsTraffic> : ""}
            <SubTitleItem SubTitleItem timeText={label}>
                Top Traffic Requests Countries / Regions
            </SubTitleItem>
            {topCountry ? <TrafficCard data={topCountry} ></TrafficCard> : ""}

        </div >
    )
}