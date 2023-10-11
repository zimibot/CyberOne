import { formatNumber } from "../../../helpers"
import { ChartLine } from "../../chart/line"

export const OverviewCard = ({ inData = [], chartData= [] }) => {

    return <div className="flex-1 text-lg h-full ">
        <div className={`grid grid-cols-2 h-full min-h-[500px] gap-4 flex-1 ${inData.length === 2 ? "xl:grid-cols-2" : "xl:grid-cols-5"} `}>
            {inData.map(({ name, type, currentTotal }, k) => {
                return <div className="border w-full flex flex-col p-4 h-full shadow fade-in bg-[#EBEBEB]" key={k}>
                    <div className="p-4 space-y-3">
                        <div className="flex justify-between items-center">
                            <div className="text-4xl">
                                {type === 'percentCacheBytes' ? `${currentTotal}%` : formatNumber(currentTotal,2)}
                            </div>
                        </div>
                        <div>
                            {name}
                        </div>
                    </div>
                    <div className="relative w-full flex-1 h-full">
                        <ChartLine data={chartData} type={type} noDate={true} />
                    </div>
                </div>
            })}

        </div>
    </div>
}