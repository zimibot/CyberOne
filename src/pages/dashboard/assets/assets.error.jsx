import { InsightsCard } from "../../../components/dashboard/assetsInsight/Insights"
import { LoadingCardx4 } from "../../../components/loading/cardLoad"

const AssetsError = ({ data, error }) => {
    if (!data || error) {
        return <LoadingCardx4 count={2} />
    }

    data = data.accounts[0]

    let deltas = data.deltas[0]?.sum
    let error4 = data?.fourxxDeltas[0]?.sum.requests
    let error5 = data?.fivexxDeltas[0]?.sum.requests
    let chartData = data.fivexxOverTime
    let chartDataFour = data.fourxxOverTime

    deltas = [
        {
            name: "4xx errors",
            type: "requests",
            currentTotal: error4,
            chartDataFour
        },
        {
            name: "5xx errors",
            type: "requests",
            otherType: true,
            currentTotal: error5,
            
        },
    ]

    return <InsightsCard inData={deltas} chartData={chartData} />
}

export default AssetsError