
import moment from "moment";
import { useContext } from "react";
import { OverviewCard } from "../../../../components/dashboard/overview"
import { SelectItem } from "../../../../components/input";
import { LayoutDashboard } from "../../../../components/layout.dashboard";
import { LoadingCardx4 } from "../../../../components/loading/cardLoad";
import MyContext from "../../../../helpers/contex";
import { userData } from "../../../../helpers/data";

const AssetsOverview = () => {

    let data = userData()
    let chartData = data.zoneData ? data.zoneData.customZone : []
    const dopt = useContext(MyContext)
    const option = dopt.option
    const getOpt = option.getOptions
    let currentDate = getOpt ? moment(getOpt.currentDate).format("DD MMMM") : ""
    let previousDate = getOpt ? moment(getOpt.previousDate).format("DD MMMM") : ""
    let item = data.zoneData ? [
        {
            name: "Unique Visitors",
            type: "uniques",
            currentTotal: data.zoneData.unique.totalUnique
        },
        {
            name: "Total Requests",
            type: "requests",
            currentTotal: data.zoneData.request.totalRequest,
        },
        {
            name: "Percent Cached",
            type: "percentCacheBytes",
            currentTotal: data.zoneData.totalPercentCached,
        },
        {
            name: "Total Data Served",
            type: "dataServed",
            currentTotal: data.zoneData.totalDataServed,
        },
        {
            name: "Data Cached",
            type: "cachedBytes",
            currentTotal: data.zoneData.bandwidth.totalDataCachedBandwidth,
        },
    ] : []

    return <LayoutDashboard classNameItem="flex flex-col gap-6" title="ASSET Overview">
        <div className="flex items-center justify-between">
            <div className="overflow-auto">
                <SelectItem user={true} selectUser={true} />
            </div>
            {/* <div className="flex items-center gap-3">
                <button className="px-4 h-14 bg-[#EBEBEB] flex items-center gap-4 hover:bg-opacity-50">
                    <span>
                        MORE DETAIL
                    </span>
                    <svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.316503 2.35L7.94984 10L0.316504 17.65L2.6665 20L12.6665 10L2.6665 8.74228e-07L0.316503 2.35Z" fill="#333" fill-opacity="0.5" />
                    </svg>
                </button>
            </div> */}
        </div>
        <div className="flex flex-col gap-2 flex-1">
            <div className="flex justify-end">
                <div>{previousDate} - {currentDate}</div>
            </div>
            {data ? data.loading ? <LoadingCardx4 count={4} /> : <OverviewCard inData={item} chartData={chartData} /> : <LoadingCardx4 count={4} />}

        </div>
    </LayoutDashboard>
}

export default AssetsOverview