
import { useContext } from "react"
import { CardMultiple } from "../../../../components/dashboard/cardMultiple"
import { MapsTraffic, SubTitleItem } from "../../../../components/main"
import { TrafficCard } from "../../../../components/traffic/traffic.card"
import { formatBytes } from "../../../../helpers"
import MyContext from "../../../../helpers/contex"

export const TrafficBandwith = ({ data, chartData = [] }) => {
    const dopt = useContext(MyContext)
    const option = dopt.option
    const getOpt = option.getOptions
    let label = getOpt.fullDay.label
    let itemdata = data ? [
        {
            total: formatBytes(data.bandwidth.totalBandwidth, 2),
            title: "Total Bandwidth",
            date: label
        },
        {
            total: formatBytes(data.bandwidth.totalDataCachedBandwidth, 2),
            title: "Cached Bandwidth",
            date: label
        },
        {
            total: formatBytes(data.bandwidth.totalDataCachedBandwidthUncached, 2),
            title: "Uncached Bandwidth",
            date: label
        }] : null
    let maps = data ? data.maps.map(d => ({
        id: d.key,
        value: d.bytes
    })) : []

    let topCountry = data ? data.topCountry : null
    return (
        <div className="flex-1 flex flex-col drop-shadow gap-4">
            <SubTitleItem timeText={label}>
                Bandwith Through Cloudflare
            </SubTitleItem>
            {data ? <CardMultiple ContentData={itemdata} chartData={chartData} /> : <LoadMultiCard />}
            <SubTitleItem timeText={label}>
                Web Traffic Bandwith by Country
            </SubTitleItem>
            {data ? <MapsTraffic id={"bandwith"} mapsData={maps}></MapsTraffic> : ""}
            <SubTitleItem SubTitleItem timeText={label}>
                Top Traffic Bandwith Countries / Regions
            </SubTitleItem>
            {topCountry ? <TrafficCard data={topCountry} type="bytes"></TrafficCard> : ""}

        </div >
    )
}