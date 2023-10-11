import { MultipleProgress } from "../../../../components/chart/multipleProgress"
import { CardMultiple } from "../../../../components/dashboard/cardMultiple"

export const SecurityBot = ({ data = [] }) => {

    return <div className="space-y-4">
        <CardMultiple ContentElement={
            <div className="flex flex-1 flex-col h-full absolute left-0 top-0 w-full p-4 gap-3">
                <MultipleProgress otherData={data.slice(1, 100)} className="flex-1 left-0 top-0" />
            </div>} gridCols={"col5"} ContentData={data} />
    </div>
}