import { InsightsCard } from "../../../components/dashboard/assetsInsight/Insights"
import { LoadingCardx4 } from "../../../components/loading/cardLoad"

const AssetsChache = ({ data, error }) => {
    if (!data || error) {
        return <LoadingCardx4 count={2} />
    }

    data = data.accounts[0]

    let deltas = data.deltas[0]?.sum
    let chartData = data.statsOverTime

    let request = deltas?.cachedRequests
    let bandwidth = deltas?.cachedBytes


    deltas = [
        {
            name: "Cached requests",
            type: "cachedRequests",
            currentTotal: request
        },
        {
            name: "Cached bandwidth",
            type: "cachedBytes",
            currentTotal: bandwidth
        },

    ]

    return <InsightsCard inData={deltas} chartData={chartData} />
}

export default AssetsChache