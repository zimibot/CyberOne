import { useContext } from "react";
import { CountryItem } from "../../../../components/country";
import { SubTitleItem } from "../../../../components/main"
import { TablesItem } from "../../../../components/table"
import MyContext from "../../../../helpers/contex";

const SecurityFirewall = ({data}) => {
    const dopt = useContext(MyContext)
    const option = dopt.option
    const getOpt = option.getOptions
    let label = getOpt.fullDay.label
    const columns = [
        {
            title: 'Date',
            dataIndex: 'datetime',
        },
        {
            title: 'Action Taken',
            dataIndex: 'action',

        },
        {
            title: 'Country',
            dataIndex: 'clientCountryName',
            render: ({ name, unique }) => <div className="flex items-center gap-3">
                <CountryItem className={unique} />
                <span>{name}</span>
            </div>,
        },
        {
            title: 'IP Address',
            dataIndex: 'clientIP',
        },
        {
            title: 'Service',
            dataIndex: 'source',
        },
    ];
    return <div className="space-y-4">
        <SubTitleItem timeText={label}>
            Firewall
        </SubTitleItem>
        <TablesItem data={data} columns={columns} serverside={false} ></TablesItem>
    </div>
}

export default SecurityFirewall