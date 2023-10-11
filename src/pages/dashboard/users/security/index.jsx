import { Select } from 'antd';
import React, { useState } from 'react';
import { Option } from 'antd/lib/mentions';
import { Tabs } from 'antd';
import { LayoutDashboard } from '../../../../components/layout.dashboard';
import ThreadsIndex from './security.threats';
import SecurityFirewall from './security.firewall';
import SecurityShields from './secuirty.shield';
import { SecurityBot } from './security.bot';
import { userData } from '../../../../helpers/data';
import { InstanLoading } from '../../../../components/loading/loading';
import { SelectItem } from '../../../../components/input';

function SecurityAssets() {

    const [tabIndex, settabIndex] = useState(1);

    const data = userData()


    return (
        <LayoutDashboard classNameItem="flex flex-col gap-6 flex-1" title="Asset Security">
            <Tabs onChange={d => settabIndex(d)} defaultActiveKey={1} className="flex-1 text-base min-h-[2000px] lg:min-h-[200px]" tabBarExtraContent={
                <div className="flex items-center gap-3">
                    <SelectItem loading={data.loading} selectUser={true} />
                </div>}>
                <Tabs.TabPane className="h-full" tab={<div className="flex items-center gap-3 text-base">
                    Threats</div>} key={1}>
                    {data.zoneData && !data.loading ? <ThreadsIndex charData={data.multiType} data={data.zoneData} /> : <InstanLoading />}
                </Tabs.TabPane>
                <Tabs.TabPane className="h-full" tab={<div className="flex items-center gap-3 text-base">
                    Firewall Events</div>} key={2}>
                    {!data.firewallLoad ? <SecurityFirewall data={data.firewallLog} /> : <InstanLoading />}
                </Tabs.TabPane>
                <Tabs.TabPane className="h-full" tab={<div className="flex items-center gap-3 text-base">
                    Page Shield</div>} key={3}>
                    <SecurityShields isload={data.shield.isValidating} data={data.shield.data} />

                </Tabs.TabPane>
                <Tabs.TabPane className="h-full" tab={<div className="flex items-center gap-3 text-base">
                    Bot</div>} key={4}>
                    {!data.trafficLoad ? <SecurityBot data={data.traffic} /> : <InstanLoading />}

                </Tabs.TabPane>
            </Tabs>
        </LayoutDashboard>
    )
}

export default SecurityAssets;
