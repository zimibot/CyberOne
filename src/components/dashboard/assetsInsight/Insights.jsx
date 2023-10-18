import { Tooltip } from "antd";
import { useEffect, useState } from "react";
import { formatBytes, formatNumber, SortObject } from "../../../helpers";
import { ChartLine } from "../../chart/line"

export const InsightsCard = ({ inData = [
    {
        name: "Request",
        total: 0
    },
    {
        name: "Bandwidth",
        total: 0
    },
    {
        name: "Visits",
        total: 0
    },
    {
        name: "Page views",
        total: 0
    },
], chartData = [] }) => {

    const [currentData, setcurrentData] = useState();
    const [downData, setDownData] = useState()

    useEffect(() => {
        var d, down
        if (inData.length === 2) {
            d = {
                [inData[0].type]: [],
                [inData[1].type]: [],
            }
            down = {
                [inData[0].type]: 0,
                [inData[1].type]: 0,
            }
        } else {
            d = {
                [inData[0].type]: [],
                [inData[1].type]: [],
                [inData[2].type]: [],
                [inData[3].type]: [],
            }
            down = {
                [inData[0].type]: 0,
                [inData[1].type]: 0,
                [inData[2].type]: 0,
                [inData[3].type]: 0,
            }
        }

        inData.map(({ type, rate }) => {
            d[type] = []
            chartData.map(({ sum, dimensions }) => {
                d[type].push({
                    [type]: sum[type],
                    date: dimensions.timestamp,
                    type: type
                })
            })
            down[type] = d[type].reduce((accum, item) => accum + item[type], 0)
        })


        setcurrentData(d)
        setDownData(down)
        return () => {
            setDownData()
            setcurrentData()
        };
    }, [chartData, inData]);

    return <div className="flex-1 text-lg h-full ">
        <div className={`grid grid-cols-2 h-full min-h-[500px] gap-4 flex-1 ${inData.length === 2 ? "xl:grid-cols-2" : "xl:grid-cols-4"} `}>
            {inData.map(({ name, type, currentTotal, chartDataFour }, k) => {
                let otherTotal = downData ? downData[type] - currentTotal : 0
                let otherCHart = chartDataFour ? chartDataFour.map(d => ({
                    [type]: d.sum[type],
                    date: d.dimensions.timestamp,
                    type: type
                })) : null


                let fourReduce = otherCHart ? otherCHart.reduce((accum, item) => accum + item[type], 0) : null
                let fourotherTotal = fourReduce ? fourReduce - currentTotal : null
                let percents = fourotherTotal ? ((fourReduce / currentTotal) * 100) : downData ? ((downData[type] / currentTotal) * 100) : 0;
                let finishTotal = fourotherTotal ? (fourotherTotal + currentTotal) : (otherTotal + currentTotal)
                let color = otherTotal !== currentTotal && percents > 100 ? "#00A3FF" : "#ED6D5E"

                return <div className="w-full flex flex-col p-4 h-full shadow fade-in bg-[#EBEBEB] dark:bg-dark_input" key={k}>
                    <div className="p-4 space-y-3 dark:text-white">
                        <div className="flex justify-between items-center">
                            <div className="text-4xl">
                                {type !== "bytes" || type !== "cachedBytes" ? formatNumber(finishTotal, 2) : formatBytes(finishTotal)}
                            </div>
                            {otherTotal !== currentTotal &&
                                <Tooltip title={<div>
                                    {percents > 100 ? <span>Up</span> : <span className="text-error_primary">Down</span>} {type !== "bytes" ? formatNumber(fourotherTotal ? fourotherTotal : otherTotal, 2, percents < 100) : formatBytes(fourotherTotal ? fourotherTotal : otherTotal, 2, percents < 100)} from {type !== "bytes" ? formatNumber(currentTotal, 2) : formatBytes(currentTotal, 2)}  in the previous period</div>
                                }>
                                    <div className="text-3xl cursor-pointer">
                                        {downData && <div className="flex items-center">
                                            {percents > 100 && <span className="flex items-center gap-4 text-blue-500">
                                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 0V2H9.59L0 11.59L1.41 13L11 3.41V12H13V0H1Z" fill="#00A3FF" />
                                                </svg>

                                                {(percents - 100).toFixed(2)}%
                                            </span>}
                                            {percents < 100 &&
                                                <span className="flex items-center gap-4 text-error_primary">
                                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1 13V11H9.59L0 1.41L1.41 0L11 9.59V1H13V13H1Z" fill="#ED6A5E" />
                                                    </svg>
                                                    {(percents - 100).toFixed(2).toString().split("-")[1]}%
                                                </span>
                                            }

                                        </div>}
                                    </div>
                                </Tooltip>
                            }
                        </div>
                        <div>
                            {name}
                        </div>
                    </div>
                    <div className="relative w-full flex-1 h-full">
                        {!chartDataFour ? currentData &&
                            <ChartLine data={currentData[type].sort(SortObject("date"))} type={type} color={color} /> : otherCHart &&
                        <ChartLine data={otherCHart.sort(SortObject("date"))} type={type} color={color} />
                        }
                    </div>
                </div>
            })}

        </div>
    </div>
}