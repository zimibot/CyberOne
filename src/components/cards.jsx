export const Cards = ({ classItem = "", children }) => {
    return <div className={`flex-1 p-4 border border-[#E3E3E3] shadow bg-[#EBEBEB] relative ${classItem} `}>
        {children}
    </div>
}