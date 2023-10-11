import React, { useState } from 'react';
import { Tabs } from 'antd';
import { LayoutDashboard } from '../../../../components/layout.dashboard';
import { TrafficRequest } from './traffic.request';
import { TrafficBandwith } from './traffic.bandwith';
import { TrafficUnique } from './traffic.unique';
import { userData } from '../../../../helpers/data';
import { SelectItem } from '../../../../components/input';
import { InstanLoading } from '../../../../components/loading/loading';

function TrafficOverview() {

    const [tabIndex, settabIndex] = useState(1);

    const data = userData()
    
    return (
        <LayoutDashboard classNameItem="flex flex-col gap-6 flex-1" title="Asset Traffic">
            <Tabs onChange={d => settabIndex(d)} defaultActiveKey={1} className="flex-1 text-base min-h-[2000px] lg:min-h-[200px]" tabBarExtraContent={<div className="flex items-center gap-3">
                <SelectItem loading={data.loading} selectUser={true} />
            </div>}>
                <Tabs.TabPane className="h-full relative" tab={<div className="flex items-center gap-3 text-base">
                    Requests</div>} key={1}>
                    {!data.loading ? <TrafficRequest data={data.zoneData} chartData={data.multiChached} /> : <InstanLoading />}
                </Tabs.TabPane>
                <Tabs.TabPane className="h-full  relative" tab={<div className="flex items-center gap-3 text-base">
                    Bandwidth</div>} key={2}>
                    {!data.loading ? <TrafficBandwith data={data.zoneData} chartData={data.multiChachedBytes} /> : <InstanLoading />}
                </Tabs.TabPane>
                <Tabs.TabPane className="h-full  relative" tab={<div className="flex items-center gap-3 text-base">
                    Unique Visitors</div>} key={3}>
                    {!data.loading ?  <TrafficUnique data={data.zoneData}></TrafficUnique> : <InstanLoading />}
                </Tabs.TabPane>
            </Tabs>
        </LayoutDashboard>
    )
}

export default TrafficOverview;
