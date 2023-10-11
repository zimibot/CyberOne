import React, { useContext, useEffect, useState } from 'react';
import { LayoutDashboard } from '../../../components/layout.dashboard'
import { SelectItem } from '../../../components/input'
import download from '../../../assets/images/icon/download.svg'
import { Tabs } from 'antd';
import { ReactSVG } from 'react-svg'
import AssetsInsight from './assets.insight'
import AssetsChache from './assets.cache';
import AssetsSecurity from './assets.security';
import AssetsError from './assets.error';
import AssetsNetwork from './assets.network';
import AssetsHeatMap from './assets.heat-map';
import { postAccountAssetsDashboard } from '../../../api/get';
import MyContext from '../../../helpers/contex';

// import { getAssetsList } from '../../../src/api/get';
function DashboardAssetsInsight() {
  // const ListData  = getAssetsList()
  const [tabIndex, settabIndex] = useState(1);
  const dOp = useContext(MyContext)
  const option = dOp.option
  const getOpt = option.getOptions

  let { data, error, isValidating } = postAccountAssetsDashboard({
    date: getOpt
  })


  return (
    <LayoutDashboard classNameItem="flex flex-col gap-6 flex-1" title="ALL ASSET INSIGHTS">
      <Tabs onChange={d => settabIndex(d)} defaultActiveKey={1} className="flex-1 text-base min-h-[2000px] lg:min-h-[200px]" tabBarExtraContent={<div className="flex items-center gap-3">
        <button className="px-4 h-14 bg-[#EBEBEB] flex items-center gap-4 hover:bg-opacity-50">
          <img src={download}></img>
          <span>
            DOWNLOAD
          </span>
        </button>
        <SelectItem loading={isValidating}></SelectItem>
      </div>}>
        <Tabs.TabPane className="h-full" tab={<div className="flex items-center gap-3 text-base">
          <ReactSVG src={'./images/dashboard/insight.svg'} />
          Insights</div>} key={1}>
          <AssetsInsight data={data} error={error} loading={isValidating}></AssetsInsight>
        </Tabs.TabPane>
        <Tabs.TabPane className="h-full" tab={<div className="flex items-center gap-3 text-base">
          <ReactSVG src={'./images/dashboard/location.svg'} />
          Heat Map</div>} key={2}>
          <AssetsHeatMap></AssetsHeatMap>
        </Tabs.TabPane>
        <Tabs.TabPane className="h-full" tab={<div className="flex items-center gap-3 text-base">
          <ReactSVG src={'./images/dashboard/shields.svg'} />
          Security</div>} key={3}>
          <AssetsSecurity data={data} error={error} loading={isValidating}></AssetsSecurity>
        </Tabs.TabPane>
        <Tabs.TabPane className="h-full" tab={<div className="flex items-center gap-3 text-base">
          <ReactSVG src={'./images/dashboard/reload.svg'} />
          Cache</div>} key={4}>
          <AssetsChache data={data} error={error}></AssetsChache>
        </Tabs.TabPane>
        <Tabs.TabPane className="h-full" tab={<div className="flex items-center gap-3 text-base">
          <ReactSVG src={'./images/dashboard/error.svg'} />
          Errors</div>} key={5}>
          <AssetsError data={data} error={error}></AssetsError>
        </Tabs.TabPane>
        <Tabs.TabPane className="h-full" tab={<div className="flex items-center gap-3 text-base">
          <ReactSVG src={'./images/dashboard/network.svg'} />
          Network</div>} key={6}>
          <AssetsNetwork></AssetsNetwork>
        </Tabs.TabPane>
      </Tabs>
    </LayoutDashboard>
  )
}

export default DashboardAssetsInsight;
