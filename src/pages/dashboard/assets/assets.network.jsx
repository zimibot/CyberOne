import { useContext } from "react"
import Skeleton from "react-loading-skeleton"
import { postAccountHTTP, postAccountSSL, postAccountTopContent } from "../../../api/get"
import { CirtcularPercents } from "../../../components/chart/cirtcular"
import { ProgressBar } from "../../../components/chart/progress"
import { RadarChart } from "../../../components/chart/radar"
import { formatNumber } from "../../../helpers"
import MyContext from "../../../helpers/contex"
const AssetsNetwork = () => {
    const dOp = useContext(MyContext)
    const option = dOp.option
    const getOpt = option.getOptions

    const http = postAccountHTTP({
        date: getOpt
    })

    const ssl = postAccountSSL({
        date: getOpt
    })

    const topContent = postAccountTopContent({
        date: getOpt
    })


    return <div className="grid grid-cols-3 h-full">
        <div className="h-full flex flex-col">
            <div className="p-2 flex items-center justify-center bg-[#EBEBEB]">Client HTTP Version Used</div>
            <div className="flex-1 border border-[#EBEBEB] drop-shadow flex flex-col">
                {!http.data || http.error ?
                    <Skeleton count={4} className={"h-full"} borderRadius={20} containerClassName="grid grid-cols-2 gap-4 flex-1 p-4" />
                    : http.data.length === 0 ?  <div className="p-3 border border-[#444] text-center">Data Not Found</div> :  <CurrentData data={http.data}></CurrentData>}
            </div>
        </div>
        <div className="h-full flex flex-col">
            <div className="p-2 flex items-center justify-center bg-[#EBEBEB]">Traffic Served Over SSL</div>
            <div className="flex-1 border border-[#EBEBEB] drop-shadow flex justify-center">
                <div className="flex-col justify-evenly h-full flex w-[65%]">
                    {!ssl.data || ssl.error ?
                        <Skeleton count={4} height={40} className={"w-full"} borderRadius={10} containerClassName="grid gap-4" />
                        : ssl.data.length === 0 ?  <div className="p-3 border border-[#444] text-center">Data Not Found</div> :  <ProgressBarItem data={ssl.data}></ProgressBarItem>
                    }

                </div>
            </div>
        </div>
        <div className="h-full flex flex-col">
            <div className="p-2 flex items-center justify-center bg-[#EBEBEB]">Top Content Types</div>
            <div className="flex-1 border border-[#EBEBEB] drop-shadow">
                {!topContent.data || topContent.error ?
                    <div className="w-full h-full p-6">
                        <Skeleton count={1} className={"w-full h-full"} borderRadius={20} containerClassName="h-full" />
                    </div>
                    : topContent.data.length === 0 ?  <div className="p-3 border border-[#444] text-center">Data Not Found</div> :  <CurrentRadar data={topContent.data}></CurrentRadar>

                }
            </div>
        </div>
    </div>
}

const CurrentRadar = ({ data }) => {
    data = data.accounts[0]
    let contentTypes = data.contentTypes

    data = contentTypes.map(d => {
        return ({
            item: d?.dimensions?.metric || 0,
            total: d?.sum?.requests || 0
        })
    })

    return <RadarChart data={data}></RadarChart>
}

const CurrentData = ({ data }) => {
    data = data.accounts[0]
    let httpProtocol = data.httpProtocols
    let total = data.total[0]?.sum?.requests || 0

    data = httpProtocol.map(d => ({
        type: d.dimensions.metric,
        value: ((d?.sum?.requests || 0 / total) * 100),
        count: d?.sum?.requests || 0
    }))

    return <div className="grid grid-cols-2 h-full flex-1">
        {data.map((d, k) => {
            return <div className="h-full w-full p-6" key={k}>
                <CirtcularPercents percentage={d.value} count={d.count} text={d.type} />
            </div>
        })}
    </div>
}

const ProgressBarItem = ({ data }) => {
    data = data.accounts[0]
    let ssl = data.sslVersions
    let total = data.total[0]?.sum?.requests || 0
    return ssl.map((d, key) => {
        let percents = (d?.sum?.requests || 0 / total) * 100
        return <div className="w-full" key={key}>
            <ProgressBar title={d.dimensions.metric} subtitle={formatNumber(d?.sum?.requests, 2)} value={percents}></ProgressBar>
        </div>
    })
}

export default AssetsNetwork