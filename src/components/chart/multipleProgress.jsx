import { Tooltip } from 'antd';
import React from 'react';


export const MultipleProgress = ({ setisSelect, className = "h-8", data = [], otherData }) => {
    let color = ['#00A3FF', '#ED6D5E', "#ff7b18", "#eb2f96", "#52c41a"]

    data = otherData ? otherData : data.map((d, k) => ({
        name: d.key,
        color: color[k],
        percent: d.percents
    }))

    let fnc = (d) =>  !otherData ? {
        onMouseEnter: () => setisSelect({ ...d }),
        onMouseLeave: () => setisSelect()
    } : {}

    return <div className={`w-full  ${className} p-1 flex`}>
        {data.map((d, k) => {
            return <Tooltip title={`${d.percent.toFixed(3)}%`} key={k}>
                <div className="h-full" {...fnc(d)} style={{
                    background: d.color,
                    width: `${d.percent}%`
                }}></div>
            </Tooltip>
        })}
    </div>
}