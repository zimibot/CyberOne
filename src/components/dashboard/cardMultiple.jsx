import { formatNumber } from "../../helpers"
import { Cards } from "../cards"
import { ChartLine } from "../chart/line"



export const CardMultiple = ({ ContentElement, multi = true, chartData = [], ContentData = [
    {
        total: "774.1k",
        title: "Total Requests",
        date: "Prev. 24h"
    },
    {
        total: "774.1k",
        title: "Cached Requests",
        date: "Prev. 24h"
    },
    {
        total: "774.1k",
        title: "Uncached Requests",
        date: "Prev. 24h"
    }],
    gridCols = "col3", type
}) => {
    let ldl = {
        col1: "xl:grid-cols",
        col2: "xl:grid-cols-2",
        col3: "xl:grid-cols-3",
        col4: "xl:grid-cols-4",
        col5: "xl:grid-cols-5",
        col6: "xl:grid-cols-6",
    }

    return <>
        <div className={`grid gap-3 ${ldl[gridCols]}`}>
            {ContentData.map((d, k) => {
                return <Cards key={k}>
                    <div className="text-4xl flex items-center gap-3">
                        {d.icon}
                        {formatNumber(d.total, 2)}
                    </div>
                    <div className="flex justify-between">
                        <span>
                            {d.title}
                        </span>
                        <span>
                            {d.date}
                        </span>
                    </div>
                </Cards>
            })}
        </div>
        <Cards classItem="min-h-[400px] relative">
            {ContentElement ? ContentElement : <ChartLine data={chartData} multi={multi} type={type} />}
        </Cards></>
}