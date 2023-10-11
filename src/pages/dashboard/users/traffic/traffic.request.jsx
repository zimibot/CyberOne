import { useContext } from "react"
import { CardMultiple } from "../../../../components/dashboard/cardMultiple"
import { LoadMultiCard } from "../../../../components/loading/multicardLoad"
import { MapsTraffic, SubTitleItem } from "../../../../components/main"
import { TrafficCard } from "../../../../components/traffic/traffic.card"
import { formatNumber } from "../../../../helpers"
import MyContext from "../../../../helpers/contex"

export const TrafficRequest = ({ data, chartData = [] }) => {
    const dopt = useContext(MyContext)
    const option = dopt.option
    const getOpt = option.getOptions
    let label = getOpt.fullDay.label
    let itemdata = data ? [
        {
            total: formatNumber(data.request.totalRequest, 2),
            title: "Total Requests",
            date: label
        },
        {
            total: formatNumber(data.request.totalDataCachedRequests, 2),
            title: "Cached Requests",
            date: label
        },
        {
            total: formatNumber(data.request.totalDataCachedRequestsUncached, 2),
            title: "Uncached Requests",
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
            {data ? <CardMultiple ContentData={itemdata} chartData={chartData} /> : <LoadMultiCard />}
            <SubTitleItem timeText={label}>
                Web Traffic Requests by Country
            </SubTitleItem>
            {data ? <MapsTraffic mapsData={maps}></MapsTraffic> : ""}
            <SubTitleItem timeText={label}>
                Top Traffic Countries / Regions
            </SubTitleItem>
            {topCountry ? <TrafficCard data={topCountry}></TrafficCard> : ""}

        </div>
    )
}