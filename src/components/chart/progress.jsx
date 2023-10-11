import { Progress, Tooltip } from "antd"

export const ProgressBar = ({title, subtitle, value = 66}) => {
    return <div className="space-y-3">
        <div className="flex items-center justify-between">
            <label>{title}</label>
            <span>{subtitle}</span>
        </div>
        <Tooltip title={`${value.toFixed(3)}%`}>
            <Progress type="line" strokeLinecap="square" strokeWidth={25} percent={value} size={100} showInfo={false} />
        </Tooltip>
    </div>
}