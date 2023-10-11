import { useContext, useState } from "react"
import { Cards } from "../../../../components/cards"
import { MultipleProgress } from "../../../../components/chart/multipleProgress"
import { ProgressBar } from "../../../../components/chart/progress"
import { CardMultiple } from "../../../../components/dashboard/cardMultiple"
import { MapsTraffic, SubTitleItem } from "../../../../components/main"
import { TrafficCard } from "../../../../components/traffic/traffic.card"
import { formatNumber } from "../../../../helpers"
import MyContext from "../../../../helpers/contex"
const ThreadsIndex = ({ data, charData }) => {
    const [isSelect, setisSelect] = useState()

    let maps = data ? data.maps.map(d => ({
        id: d.key,
        value: d.requests
    })) : []
    let topCountry = data.topCountry

    let intop = data.dataItems.badBrowserList[0] ? (data.threads.totalThreats - data.dataItems.badBrowserList[0].requests) : data.threads.totalThreats
    let oltop = data.dataItems.badBrowserList[0] ? data.dataItems.badBrowserList[0].requests : 0

    let totaltop = intop === 0 && oltop === 0 ? "-" : intop > oltop ? "Unclassified" : "Bad browser"
    const dopt = useContext(MyContext)
    const option = dopt.option
    const getOpt = option.getOptions
    let label = getOpt.fullDay.label
    let inData = [
        {
            total: data.threads.totalThreats,
            title: "Total Threats",
            date: label
        },
        {
            total: <div className="flex items-center gap-3">
                {topCountry[0]?.div} <span>{topCountry[0]?.country}</span>
            </div>,
            title: "Top Country",
            date: label
        },
        {
            total: totaltop,
            title: "Top Threat Type",
            date: label
        }]



    return <div className="space-y-4">
        <div>
            <h1 className="text-lg font-bold">Overview Threats</h1>
            <span>{label}</span>
        </div>
        <div className="grid xl:grid-cols-3 gap-3">
            <Cards>
                <div className="text-4xl">
                    {data.threads.totalThreats}
                </div>
                <span>Total Threats Stopped</span>
            </Cards>
            <Cards classItem="flex flex-col gap-3  overflow-hidden">
                <div className="space-y-2">
                    <div>
                        <div className="flex justify-between">
                            <span>
                                Traffic Served Over SSL
                            </span>
                            <span>{formatNumber(data.threads.totalSSLThreads, 2)}</span>
                        </div>
                        <MultipleProgress setisSelect={setisSelect} data={data.dataItems.clientSsl} />
                    </div>
                    <div className="ml-[-17px] mr-[-17px] !mb-[-17px]">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="p-2 border border-[#c1c1c1] text-left">TLS version</th>
                                    <th className="p-2 border border-[#c1c1c1] text-right">Requests</th>
                                    <th className="p-2 border border-[#c1c1c1] text-right">% of Requests</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.dataItems.clientSsl.map((d, k) => {
                                    return <tr key={k} className={`${isSelect?.name === d.key ? "text-white" : ""}`} style={{
                                        background: isSelect?.name === d.key && isSelect?.color
                                    }}>
                                        <td className="p-2 border border-[#c1c1c1]">{d.key}</td>
                                        <td className="p-2 border border-[#c1c1c1] text-right">{d.requests}</td>
                                        <td className="p-2 border border-[#c1c1c1] text-right">{d.percents.toFixed(3)}%</td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </Cards>
            <Cards>
                <div className="space-y-2 flex flex-col h-full">
                    <div>
                        <ProgressBar title={'Types of Threat Mitigated'} value={data.dataItems.badBrowserList[0] ? (((data.threads.totalThreats - data.dataItems.badBrowserList[0].requests) / data.threads.totalThreats) * 100) : intop === 0 && oltop === 0 ? 0 : 100} setisSelect={setisSelect} />
                    </div>
                    <div className="ml-[-17px] mr-[-17px] !mb-[-17px] flex justify-end items-end flex-1">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="p-2 border border-[#c1c1c1] text-left">Type</th>
                                    <th className="p-2 border border-[#c1c1c1] text-right">Requests</th>
                                    <th className="p-2 border border-[#c1c1c1] text-right">% of Requests</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-2 border border-[#c1c1c1]">Unclassified</td>
                                    <td className="p-2 border border-[#c1c1c1] text-right">{data.dataItems.badBrowserList[0] ? data.threads.totalThreats - data.dataItems.badBrowserList[0].requests : data.threads.totalThreats}</td>
                                    <td className="p-2 border border-[#c1c1c1] text-right">{data.dataItems.badBrowserList[0] ? `${(((data.threads.totalThreats - data.dataItems.badBrowserList[0].requests) / data.threads.totalThreats) * 100).toFixed(3)}%` : intop === 0 && oltop === 0 ? 0 : `100%`}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border border-[#c1c1c1]">Bad browser</td>
                                    <td className="p-2 border border-[#c1c1c1] text-right">{data.dataItems.badBrowserList[0] ? data.dataItems.badBrowserList[0].requests : 0}</td>
                                    <td className="p-2 border border-[#c1c1c1] text-right">{data.dataItems.badBrowserList[0] ? `${((data.dataItems.badBrowserList[0].requests / data.threads.totalThreats) * 100).toFixed(3)}` : 0}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Cards>
        </div>
        <SubTitleItem timeText={label}>
            Threats
        </SubTitleItem>
        <CardMultiple ContentData={inData} chartData={charData} multi={true} />
        <SubTitleItem timeText={label}>
            Web Traffic Requests by Country
        </SubTitleItem>
        <MapsTraffic id={"threads"} mapsData={maps} />
        <SubTitleItem timeText={label}>
            Top Traffic Countries / Regions
        </SubTitleItem>
        <TrafficCard data={topCountry} />
        <SubTitleItem timeText={label}>
            Top Crawlers / Bots
        </SubTitleItem>
        <TrafficCard data={data.dataItems.crawlbot} src={true} type="pageViews" />

    </div>
}

export default ThreadsIndex