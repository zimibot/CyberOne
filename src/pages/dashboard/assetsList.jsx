import React from 'react';
import { LayoutDashboard } from '../../components/layout.dashboard'
import { Input } from '../../components/input'
import iconSearch from '../../assets/images/icon/search.svg'
import { getAssetsList } from '../../api/get'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom';


function DashboardAssetsList() {
  let dataList = getAssetsList().data
  let dataError = getAssetsList().error
  return (
    <LayoutDashboard classNameItem="flex flex-col gap-6" title="ASSET LIST">
      <form>
        <Input label={"SEARCH ASSET"} placeholder="Search" icon={iconSearch}></Input>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {dataList && !dataError ? dataList.result.length === 0 ? <div className="col-span-full">
          <div className="p-3 border border-[#444] text-center">Data Assets Not Found</div>
        </div> :
          dataList.result.map(d => {
            let status = d.status === "active"
            return (
              <Link to={`/user/zone/${d.name}/assets-overview`}  state={{
                id: d.id,
                name:d.name
              }} key={d.id} className="flex items-center border bg-[#EBEBEB] shadow border-border_primary hover:bg-white hover:bg-opacity-20 cursor-pointer">
                <div className="flex items-center justify-center text-6xl p-5 text-[#00A3FF]">{d.name.charAt(0).toUpperCase()}</div>
                <div className="flex flex-col justify-around flex-1 h-full py-4 text-ellipsis overflow-hidden pr-4">
                  <div className="text-3xl text-ellipsis overflow-hidden">{d.name}</div>
                  <div className="flex items-center gap-2">
                    <div>
                      {status ? <svg width="12" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6.20599 0L11.5668 13.0512L6.20599 18.412L0.845231 13.0512L6.20599 0Z" fill="#00A3FF" /> </svg>
                        : <svg width="12" height="19" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.40942 0L10.7702 13.0512L5.40942 18.412L0.0486607 13.0512L5.40942 0Z" fill="#F4BF4E" />
                        </svg>
                      }
                    </div>
                    {status ? "Protected" : "Awaiting Progress"}
                  </div>
                </div>
              </Link>
            )
          })

          : <Skeleton containerClassName='grid  grid-cols-1 md:grid-cols-2  xl:grid-cols-3 col-span-3 gap-4' count={6} height={70} />}

      </div>
    </LayoutDashboard>
  )
}

export default DashboardAssetsList;
