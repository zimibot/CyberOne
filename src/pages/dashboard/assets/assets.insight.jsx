import { InsightsCard } from "../../../components/dashboard/assetsInsight/Insights"
import { LoadingCardx4 } from "../../../components/loading/cardLoad"

const AssetsInsight = ({ data, error }) => {
    if (!data || error) {
        return <LoadingCardx4 count={4} />
    }

    data = data.accounts[0]


    let deltas = data.deltas[0]?.sum
    let chartData = data.statsOverTime


    let request = deltas?.requests
    let bandwidth = deltas?.bytes
    let visits = deltas?.visits
    let pageViews = deltas?.pageViews


    deltas = [
        {
            name: "Request",
            type: "requests",
            currentTotal: request
        },
        {
            name: "Bandwidth",
            type: "bytes",
            currentTotal: bandwidth,
        },
        {
            name: "Visits",
            type: "visits",
            currentTotal: visits,
        },
        {
            name: "Page views",
            type: "pageViews",
            currentTotal: pageViews,
        },
    ]

    return <InsightsCard inData={deltas} chartData={chartData} />

}

export default AssetsInsight