import Skeleton from "react-loading-skeleton"

export const LoadMultiCard = () => {
    return <div className="flex flex-col gap-4">
        <Skeleton count={3} height={100} containerClassName={"grid gap-3 grid-cols-3"}></Skeleton>
        <Skeleton count={1} height={420} className="w-full"></Skeleton>
    </div>
}

