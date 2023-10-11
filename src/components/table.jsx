import { DownOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Descriptions, Table } from 'antd';
import { useContext, useState } from 'react';
import MyContext from '../helpers/contex';



export const TablesItem = ({ columns = [], data = [], serverside = false, info, loading = false }) => {
    const [currentPage, setcurrentPage] = useState(1)

    const dOp = useContext(MyContext)
    const page = dOp.page
    const setpage = page.setCurrentPages

    const onChange = (pagination) => {
        setcurrentPage(pagination.current)
        setpage(d => ({
            ...d,
            page: pagination.current
        }))
    };
    const expandedRowRender = (record) => {
        let {
            rayName,
            clientASNDescription,
            clientRequestHTTPMethodName,
            clientRequestHTTPProtocol,
            clientCountryName,
            source,
            clientRequestHTTPHost,
            rulesetId,
            clientRequestPath,
            clientRequestQuery,
            ruleId,
            userAgent,
            clientIP
        } = record
        return (
            <div className="flex gap-3">
                <div className="flex-1">
                    <Descriptions column={2} bordered size='small'>
                        <Descriptions.Item label={<div className="font-bold">Ray ID</div>}>{rayName}</Descriptions.Item>
                        <Descriptions.Item label={<div className="font-bold">ASN</div>}>{clientASNDescription}</Descriptions.Item>
                        <Descriptions.Item label={<div className="font-bold">Method</div>}>{clientRequestHTTPMethodName}</Descriptions.Item>
                        <Descriptions.Item label={<div className="font-bold">Country</div>}>{clientCountryName.name}</Descriptions.Item>
                        <Descriptions.Item label={<div className="font-bold">HTTP Version</div>}>{clientRequestHTTPProtocol}</Descriptions.Item>
                        <Descriptions.Item label={<div className="font-bold">Service</div>}>{source}</Descriptions.Item>
                        <Descriptions.Item label={<div className="font-bold">Host</div>}>{clientRequestHTTPHost}</Descriptions.Item>
                        <Descriptions.Item label={<div className="font-bold">Ruleset ID</div>}>{rulesetId}</Descriptions.Item>
                        <Descriptions.Item label={<div className="font-bold">Path</div>}>{clientRequestPath}</Descriptions.Item>
                        <Descriptions.Item label={<div className="font-bold">Query string</div>}>{clientRequestQuery}</Descriptions.Item>
                        <Descriptions.Item label={<div className="font-bold">Rule ID</div>}>{ruleId}</Descriptions.Item>
                        <Descriptions.Item label={<div className="font-bold">User Agent</div>}>
                            <div className="max-w-[400px]">
                                {userAgent}
                            </div>
                        </Descriptions.Item>
                        <Descriptions.Item label={<div className="font-bold">IP Address</div>}>{clientIP}</Descriptions.Item>
                    </Descriptions>
                </div>
                {/* <div className="border flex-1 flex flex-col justify-between max-w-[250px]">
                    <div className="flex-1 flex flex-col justify-center items-center">
                        <div className="text-8xl text-[#ED6D5E]">50</div>
                        <span>OWASP Score</span>
                    </div>
                    <div className="border flex justify-between">
                        <div className="p-4 border-r">Action Taken</div>
                        <div className="p-4 justify-center flex flex-1 text-blue-500">Block</div>
                    </div>
                </div> */}
            </div>
        )
    }
    const server = serverside ? {
        total: info?.total_count,
        current: currentPage,
        pageSize: info?.per_page,
    } : {

    }
    return (
        <Table
            className="table-custom"
            columns={columns}
            dataSource={data}
            onChange={onChange}
            loading={loading}
            expandable={serverside ? false : {
                expandIcon: ({ expanded, onExpand, record }) => {
                    if (!expanded) {

                        return <button onClick={(e) => onExpand(record, e)}>
                            <RightOutlined />
                        </button>
                    } else {
                        return <button className="text-blue-500" onClick={(e) => onExpand(record, e)}>
                            <DownOutlined />
                        </button>
                    }
                },
                expandedRowRender: (record) => expandedRowRender(record),
                rowExpandable: (record) => record.service !== 'Not Expandable',
            }}
            pagination={{

                ...server,
                className: "justify-start",
                responsive: true,
                prevIcon: <button className="flex items-center justify-center h-full w-full bg-[#EBEBEB] shadow"><LeftOutlined /></button>,
                nextIcon: <button className="flex items-center justify-center h-full w-full bg-[#EBEBEB] shadow"><RightOutlined /></button>
            }}
            scroll={{
                y: 600,
            }} />
    )
}