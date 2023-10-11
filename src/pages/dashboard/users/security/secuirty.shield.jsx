import { TablesItem } from "../../../../components/table"
import { Input } from "../../../../components/input"
import iconSearch from "../../../../assets/images/icon/search.svg"
import MyContext from "../../../../helpers/contex"
import { useContext } from "react"
import { useForm } from "react-hook-form";

const SecurityShields = ({ data, isload }) => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        setpage(d => ({
            ...d,
           ...data
        }))
    };

    const dOp = useContext(MyContext)
    const page = dOp.page
    const setpage = page.setCurrentPages
    const columns = [
        {
            title: 'Script',
            dataIndex: 'url',
        },
        {
            title: 'First Seen',
            dataIndex: 'first_seen_at',

        },
        {
            title: 'Last Seen',
            dataIndex: 'last_seen_at',
        },
        {
            title: 'Host',
            dataIndex: 'host',
        },
    ];

    return <div className="space-y-4">
        <div>
            <form className="flex gap-2 items-center" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full max-w-lg">
                    <Input register={register("search")} placeholder="Script...." icon={iconSearch}></Input>
                </div>
                <div className="flex items-center gap-3">
                    <Input register={register("hosts")} placeholder="Host...." icon={iconSearch}></Input>
                </div>
                <div className="flex items-center gap-3">
                    <button type="submit" className="bg-[#EBEBEB] h-full px-4 py-2 flex items-center shadow">
                        SEARCH
                    </button>
                </div>
            </form>

        </div>
        <TablesItem data={data ? data.result : []} info={data?.result_info} loading={isload} columns={columns} serverside={true}></TablesItem>
    </div>
}

export default SecurityShields