import { InsightsCard } from "../../../components/dashboard/assetsInsight/Insights"
import { LoadingCardx4 } from "../../../components/loading/cardLoad"

const AssetsSecurity = ({ data, error, loading }) => {
    if (!data || error) {
        return <LoadingCardx4 count={2}/>
    }

    data = data.accounts[0]

    let deltas = data.encryptedDeltas[0]?.sum
    let chartData = data.encryptedRequestsOverTime

    let request = deltas?.requests
    let bandwidth = deltas?.bytes


    deltas = [
        {
            name: "Encrypted requests",
            type: "requests",
            currentTotal: request
        },
        {
            name: "Encrypted bandwidth",
            type: "bytes",
            currentTotal: bandwidth,
        },
    ]

    return <InsightsCard inData={deltas} chartData={chartData} />
}

export default AssetsSecurity