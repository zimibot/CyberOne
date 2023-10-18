import "flag-icons/css/flag-icons.min.css";
import { ChartTinyArea } from '../../../components/chart/TinyArea'
import AmMaps from '../../../components/maps/am4-maps'
import { CountryItem } from '../../../components/country'
import { useContext } from "react";
import MyContext from "../../../helpers/contex";
import { postAccountLocations, postAccountLocationsSparkline } from "../../../api/get";
import { formatBytes, formatNumber } from "../../../helpers";
import { listCountryJson } from "../../../assets/nameCountry";
import Skeleton from "react-loading-skeleton";
import { LoadingOutlined } from "@ant-design/icons";

const AssetsHeatMap = () => {

    const dOp = useContext(MyContext)
    const option = dOp.option
    const getOpt = option.getOptions

    const Locations = postAccountLocations({
        date: getOpt
    })

    const LocationsSparkline = postAccountLocationsSparkline({
        date: getOpt
    })


    return <div className="grid grid-cols-7 h-full">
        <div className="h-full flex flex-col col-span-3">
            <div className="grid grid-cols-3">
                <div className="p-2 flex items-center justify-center bg-[#EBEBEB] dark:bg-border_primary">Country</div>
                <div className="p-2 flex items-center justify-center bg-[#EBEBEB] dark:bg-border_primary">Requests</div>
                <div className="p-2 flex items-center justify-center bg-[#EBEBEB] dark:bg-border_primary">Bandwidth</div>
            </div>
            <div className="flex-1 drop-shadow flex flex-col max-h-[600px] overflow-auto">
                {!Locations.data || Locations.error || !LocationsSparkline.data || LocationsSparkline.error ? <div className=" p-6 h-full w-full">
                    <Skeleton count={7} className="w-full" height={45} containerClassName="grid gap-2" />
                </div> : <ListCountry data={Locations.data} sparkLine={LocationsSparkline.data} />}
            </div>
        </div>
        {/* <div className="h-full flex flex-col">
            <div className="p-2 flex items-center justify-center bg-[#EBEBEB] dark:bg-border_primary">Requests</div>
            <div className="flex-1 drop-shadow flex justify-center">
                <div className="flex-col justify-evenly h-full flex w-[65%]">

                </div>
            </div>
        </div>
        <div className="h-full flex flex-col">
            <div className="p-2 flex items-center justify-center bg-[#EBEBEB] dark:bg-border_primary">Bandwidth</div>
            <div className="flex-1 drop-shadow">
            </div>
        </div> */}
        <div className="h-full flex flex-col col-span-4">
            <div className="p-2 flex items-center justify-center bg-[#EBEBEB] dark:bg-border_primary">World Heat Map</div>
            <div className="flex-1 drop-shadow relative">
                {!Locations.data || Locations.error ? <div className="w-full h-full overflow-hidden loader absolute top-0 left-0 flex items-center justify-center text-3xl text-primary">
                    <LoadingOutlined />
                </div> : <AmMaps data={Locations.data} />}
            </div>
        </div>
    </div>
}



const ListCountry = ({ data = [], sparkLine = [] }) => {
    sparkLine = sparkLine ? sparkLine.accounts[0].locationSparklines : []
    sparkLine = sparkLine.map(d => ({
        clientCountryName: d.dimensions.clientCountryName,
        requests: d.sum?.requests,
        bytes: d.sum.bytes,
    }))

    let sparkLineData = [];

    sparkLine.map(x => {
        let find;
        if (find = sparkLineData.find(y => y.clientCountryName === x.clientCountryName)) {
            find.requests = Array.isArray(find.requests) ? [...find.requests, x.requests] : [find.requests, x.requests]
            find.bytes = Array.isArray(find.bytes) ? [...find.bytes, x.bytes] : [find.bytes, x.bytes]
        } else {
            sparkLineData.push(x)
        }
    })



    data = data ? data.accounts[0].locationTotals : []
    data = data.map(d => ({
        clientCountryName: d.dimensions.clientCountryName,
        requests: d.sum.requests,
        bytes: d.sum.bytes,
    }))


    let nameCountry = listCountryJson()

    return (data.map((d, key) => {
        var filterednames = nameCountry.filter(function (obj) {
            return obj.code === d.clientCountryName
        });
        var filterChartsSparkline = sparkLineData.filter(function (obj) {
            return obj.clientCountryName === d.clientCountryName
        });


        return <div className="grid grid-cols-3 py-3 border-b border-b-gray-300" key={key}>
            <div className="grid grid-cols-3">
                <div className="flex items-center justify-center">{key + 1}</div>
                <div className="flex items-center justify-center">
                    <CountryItem className={d.clientCountryName.toLowerCase()} />
                </div>
                <div className="flex items-center justify-center">{filterednames[0]?.name}</div>
            </div>
            <div className="grid grid-cols-2 overflow-hidden">
                <div className="flex items-center justify-center">{formatNumber(d.requests, 2)}</div>
                <div className="relative">
                    {Array.isArray(filterChartsSparkline[0]?.requests) &&
                        <ChartTinyArea data={filterChartsSparkline[0]?.requests}></ChartTinyArea>
                    }
                </div>
            </div>
            <div className="grid grid-cols-2 overflow-hidden">
                <div className="flex items-center justify-center">{formatBytes(d.bytes)}</div>
                <div className="relative">
                    {Array.isArray(filterChartsSparkline[0]?.bytes) &&
                        <ChartTinyArea data={filterChartsSparkline[0].bytes}></ChartTinyArea>
                    }
                </div>
            </div>
        </div>
    })

    )
}

export default AssetsHeatMap