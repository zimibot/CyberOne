import Skeleton from "react-loading-skeleton"

export const LoadingCardx4 = ({ count = 4 }) => {
    return <Skeleton count={count} height={450} containerClassName={`grid grid-cols-2 ${count === 2 ? "xl:grid-cols-2" : "xl:grid-cols-4"}  gap-4`} />
}