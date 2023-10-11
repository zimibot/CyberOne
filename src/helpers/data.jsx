import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPageShield, postActivityLogQuery, postQueryGetTrafficDistribution, postUserZoneAnalytics } from "../api/get";
import { listCountryJson } from "../assets/nameCountry";
import MyContext from "./contex";

export const userData = () => {

    const [zoneData, setzoneData] = useState()
    const [multiChached, setmultiChached] = useState([]);
    const [multiChachedBytes, setmultiChachedBytes] = useState([]);
    const [multiType, setmultiType] = useState([]);
    const [firewallLog, setfirewallLog] = useState([]);
    const [traffic, settraffic] = useState([]);
    let location = useLocation()
    const dOp = useContext(MyContext)
    const page = dOp.page
    const getpage = page.getCurrentPages?.page
    const search = page.getCurrentPages?.search
    const hosts = page.getCurrentPages?.hosts
    const option = dOp.option
    const getOpt = option.getOptions
    const shield = getPageShield({ userId: location.state?.id, search: search, hosts: hosts }, 15, getpage)
    
    const postActivityLog = postActivityLogQuery({
        date: getOpt,
        userId: location.state?.id
    })
    const getTraffic = postQueryGetTrafficDistribution({
        date: getOpt,
        userId: location.state?.id
    })
    const UserZoneAnalytics = postUserZoneAnalytics({
        date: getOpt,
        userId: location.state?.id
    })

    useEffect(() => {
        const total = (arr, types) => {
            return arr.reduce((accum, item) => accum + item[types], 0)
        }
        if (getTraffic.data) {
            let iconColor = [
                {
                    color: "#ED6D5E",
                    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.97019 20.4402C6.64019 21.8302 8.7102 22.7402 11.0002 22.9502V20.9402C9.2702 20.7502 7.69019 20.0602 6.39019 19.0202L4.97019 20.4402ZM13.0002 20.9402V22.9502C15.2902 22.7502 17.3602 21.8302 19.0302 20.4402L17.6102 19.0202C16.2874 20.0857 14.6882 20.7517 13.0002 20.9402ZM19.0202 17.6102L20.4402 19.0302C21.8302 17.3602 22.7402 15.2902 22.9502 13.0002H20.9402C20.7502 14.7302 20.0602 16.3102 19.0202 17.6102ZM3.06019 13.0002H1.05019C1.26019 15.2902 2.17019 17.3602 3.56019 19.0302L4.98019 17.6102C3.91471 16.2874 3.24865 14.6882 3.06019 13.0002ZM17.0002 12.0002L13.5602 10.4402L12.0002 7.0002L10.4402 10.4402L7.0002 12.0002L10.4402 13.5602L12.0002 17.0002L13.5602 13.5602L17.0002 12.0002Z" fill="#ED6D5E" />
                        <path d="M12 2.99977C13.4768 3.00008 14.9306 3.36542 16.2321 4.06328C17.5336 4.76114 18.6425 5.76988 19.46 6.99977H17V8.99977H23V2.99977H21V5.69977C19.01 2.85977 15.73 0.999765 12 0.999765C7.13 0.999765 3 4.16977 1.56 8.55977L3.52 9.00977C4.75 5.51977 8.08 2.99977 12 2.99977Z" fill="#ED6D5E" />
                    </svg>,
                },
                {
                    color: "#EDA35E",
                    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 12C10 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14C10.9 14 10 13.1 10 12ZM12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12H24L20 16L16 12H19C19 8.13 15.87 5 12 5C8.13 5 5 8.13 5 12C4.99864 13.2858 5.35171 14.5471 6.02041 15.6453C6.68911 16.7435 7.64758 17.6362 8.79051 18.2252C9.93345 18.8142 11.2166 19.0769 12.4991 18.9842C13.7815 18.8916 15.0136 18.4472 16.06 17.7L17.48 19.14C16.3454 20.0107 15.0195 20.5985 13.6124 20.8545C12.2053 21.1106 10.7574 21.0277 9.38878 20.6126C8.02012 20.1975 6.7701 19.4622 5.74231 18.4676C4.71452 17.473 3.93856 16.2478 3.47873 14.8935C3.01891 13.5392 2.88847 12.0949 3.09822 10.6801C3.30798 9.26534 3.85188 7.92094 4.68485 6.75832C5.51783 5.59569 6.61589 4.64833 7.88803 3.99474C9.16018 3.34114 10.5698 3.00015 12 3Z" fill="#EDA35E" />
                    </svg>
                    ,
                },
                {
                    color: "#005D92",
                    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.0789 1.5C14.2377 1.50001 14.3924 1.55041 14.5207 1.64394C14.649 1.73748 14.7443 1.86933 14.7929 2.0205L15.6179 4.584C15.9644 4.7535 16.2959 4.944 16.6124 5.1585L19.2464 4.5915C19.4017 4.55834 19.5635 4.57534 19.7086 4.64003C19.8536 4.70473 19.9743 4.81379 20.0534 4.9515L22.1324 8.55C22.2118 8.68763 22.2454 8.84693 22.2284 9.0049C22.2115 9.16288 22.1447 9.31139 22.0379 9.429L20.2304 11.424C20.2567 11.8065 20.2567 12.1905 20.2304 12.573L22.0379 14.571C22.1447 14.6886 22.2115 14.8371 22.2284 14.9951C22.2454 15.1531 22.2118 15.3124 22.1324 15.45L20.0534 19.05C19.9741 19.1874 19.8533 19.2962 19.7083 19.3606C19.5633 19.425 19.4016 19.4418 19.2464 19.4085L16.6124 18.8415C16.2974 19.0545 15.9644 19.2465 15.6194 19.416L14.7929 21.9795C14.7443 22.1307 14.649 22.2625 14.5207 22.3561C14.3924 22.4496 14.2377 22.5 14.0789 22.5H9.92092C9.76213 22.5 9.60744 22.4496 9.47913 22.3561C9.35082 22.2625 9.25551 22.1307 9.20692 21.9795L8.38342 19.4175C8.03785 19.2485 7.70453 19.0555 7.38592 18.84L4.75342 19.4085C4.59812 19.4417 4.4363 19.4247 4.29127 19.36C4.14624 19.2953 4.0255 19.1862 3.94642 19.0485L1.86742 15.45C1.78803 15.3124 1.7544 15.1531 1.77139 14.9951C1.78837 14.8371 1.85509 14.6886 1.96192 14.571L3.76942 12.573C3.74324 12.1914 3.74324 11.8086 3.76942 11.427L1.96192 9.429C1.85509 9.31139 1.78837 9.16288 1.77139 9.0049C1.7544 8.84693 1.78803 8.68763 1.86742 8.55L3.94642 4.95C4.02571 4.81256 4.14656 4.70381 4.29156 4.63939C4.43657 4.57497 4.59828 4.55821 4.75342 4.5915L7.38592 5.16C7.70392 4.9455 8.03692 4.752 8.38342 4.5825L9.20842 2.0205C9.25685 1.86982 9.35171 1.73832 9.47942 1.64482C9.60713 1.55133 9.76114 1.50064 9.91942 1.5H14.0774H14.0789ZM13.5299 3H10.4699L9.61792 5.6505L9.04342 5.931C8.76099 6.06921 8.48836 6.22657 8.22742 6.402L7.69642 6.762L4.97242 6.174L3.44242 8.826L5.30992 10.893L5.26492 11.529C5.24337 11.8426 5.24337 12.1574 5.26492 12.471L5.30992 13.107L3.43942 15.174L4.97092 17.826L7.69492 17.2395L8.22592 17.598C8.48686 17.7734 8.75949 17.9308 9.04192 18.069L9.61642 18.3495L10.4699 21H13.5329L14.3879 18.348L14.9609 18.069C15.243 17.9311 15.5152 17.7737 15.7754 17.598L16.3049 17.2395L19.0304 17.826L20.5604 15.174L18.6914 13.107L18.7364 12.471C18.758 12.1569 18.758 11.8416 18.7364 11.5275L18.6914 10.8915L20.5619 8.826L19.0304 6.174L16.3049 6.759L15.7754 6.402C15.5152 6.22622 15.2431 6.06884 14.9609 5.931L14.3879 5.652L13.5314 3H13.5299ZM11.9999 7.5C13.1934 7.5 14.338 7.97411 15.1819 8.81802C16.0258 9.66193 16.4999 10.8065 16.4999 12C16.4999 13.1935 16.0258 14.3381 15.1819 15.182C14.338 16.0259 13.1934 16.5 11.9999 16.5C10.8064 16.5 9.66185 16.0259 8.81794 15.182C7.97402 14.3381 7.49992 13.1935 7.49992 12C7.49992 10.8065 7.97402 9.66193 8.81794 8.81802C9.66185 7.97411 10.8064 7.5 11.9999 7.5ZM11.9999 9C11.2043 9 10.4412 9.31607 9.8786 9.87868C9.31599 10.4413 8.99992 11.2044 8.99992 12C8.99992 12.7956 9.31599 13.5587 9.8786 14.1213C10.4412 14.6839 11.2043 15 11.9999 15C12.7956 15 13.5586 14.6839 14.1212 14.1213C14.6838 13.5587 14.9999 12.7956 14.9999 12C14.9999 11.2044 14.6838 10.4413 14.1212 9.87868C13.5586 9.31607 12.7956 9 11.9999 9Z" fill="#005D92" />
                    </svg>
                    ,
                },
                {
                    color: "#00A3FF",
                    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6.5C13.8387 6.49389 15.6419 7.00678 17.2021 7.97973C18.7624 8.95267 20.0164 10.3462 20.82 12C19.17 15.37 15.8 17.5 12 17.5C8.2 17.5 4.83 15.37 3.18 12C3.98362 10.3462 5.23763 8.95267 6.79788 7.97973C8.35813 7.00678 10.1613 6.49389 12 6.5ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 9.5C12.663 9.5 13.2989 9.76339 13.7678 10.2322C14.2366 10.7011 14.5 11.337 14.5 12C14.5 12.663 14.2366 13.2989 13.7678 13.7678C13.2989 14.2366 12.663 14.5 12 14.5C11.337 14.5 10.7011 14.2366 10.2322 13.7678C9.76339 13.2989 9.5 12.663 9.5 12C9.5 11.337 9.76339 10.7011 10.2322 10.2322C10.7011 9.76339 11.337 9.5 12 9.5ZM12 7.5C9.52 7.5 7.5 9.52 7.5 12C7.5 14.48 9.52 16.5 12 16.5C14.48 16.5 16.5 14.48 16.5 12C16.5 9.52 14.48 7.5 12 7.5Z" fill="#00A3FF" />
                    </svg>
                    ,
                },
            ]
            let traffic = getTraffic.data.zones[0]?.trafficDistribution
            let mainTraffic = traffic.map((d, k) => {
                let name = d.dimensions.botManagementDecision?.split("_")
                let upper = name.length === 2 ? name[0].charAt(0).toUpperCase() + name[0].slice(1) + " " + name[1].charAt(0).toUpperCase() + name[1].slice(1) : name[0].charAt(0).toUpperCase() + name[0].slice(1)
                return ({
                    total: d.count,
                    title: upper,
                    percent: (d.count / total(traffic, "count")) * 100,
                    ...iconColor[k]
                })
            })
            settraffic([
                {
                    total: total(mainTraffic, "total"),
                    title: "Total"

                },
                ...mainTraffic,
            ])

        }

        return () => {
            settraffic([])
        }

    }, [getTraffic.data]);

    useEffect(() => {
        const countryName = listCountryJson()

        if (postActivityLog.data) {
            let zoneActivity = postActivityLog.data.zones[0].activity
            let mainZone = zoneActivity.map((d, k) => {
                var filterednames = countryName.filter(function (obj) {
                    return obj.code === d.clientCountryName
                });

                return ({
                    ...d,
                    key: k,
                    clientCountryName: {
                        unique: d.clientCountryName,
                        name: filterednames[0]?.name
                    }
                })
            })

            setfirewallLog(mainZone)
        }

        return () => {
            setfirewallLog([])
        };
    }, [postActivityLog.data]);


    useEffect(() => {
        const countryName = listCountryJson()
        let maps = []
        let itemsSsl = []
        let threatPathing = []
        let crawlbot = []
        if (UserZoneAnalytics.data) {
            // let totalUnique = UserZoneAnalytics.data.zones[0].totals[0].uniq
            let currentZone = UserZoneAnalytics.data.zones[0].zones.map(d => ({
                ...d.sum,
                date: moment(d.dimensions.timeslot).format("lll"),
                ...d.uniq
            }))

            let customZone = currentZone.map((d) => ({
                percentCacheRequests: ((d.cachedRequests / d.requests) * 100),
                percentCacheBytes: ((d.cachedBytes / d.bytes) * 100),
                dataServed: (d.bytes + d.encryptedBytes) - d.encryptedBytes,
                uncachedRequests: d.requests - d.cachedRequests,
                uncachedBandwidth: d.bytes - d.cachedBytes,
                ...d
            }))

            let mapMulti = customZone.map(d => ({
                ...d.countryMap
            }))

            let newclientSSLMap = customZone.map(d => ({
                ...d.clientSSLMap
            }))

            let threatPathingMap = customZone.map(d => ({
                ...d.threatPathingMap
            }))
            let browserMap = customZone.map(d => ({
                ...d.browserMap
            }))

            let multipleUncachedRequests = customZone.map(d => ({
                date: moment(d.date).format('lll'),
                value: d.uncachedRequests,
                category: "Uncached Requests"
            }))

            let multipleBadBrowser = customZone.map(d => ({
                date: moment(d.date).format('lll'),
                value: d.threatPathingMap[0] ? d.threatPathingMap[0].requests : 0,
                category: "Bad browser"
            }))

            let multipleUnclassified = customZone.map(d => ({
                date: moment(d.date).format('lll'),
                value: d.threatPathingMap[0] ? d.threats - d.threatPathingMap[0].requests : d.threats,
                category: "Unclassified"
            }))

            let multipleCachedRequests = customZone.map(d => ({
                date: moment(d.date).format('lll'),
                value: d.cachedRequests,
                category: "Cached Requests"
            }))

            let multipleUncachedBandwidth = customZone.map(d => ({
                date: moment(d.date).format('lll'),
                value: d.uncachedBandwidth,
                category: "Uncached Bandwidth"
            }))

            let multipleCachedBandwidth = customZone.map(d => ({
                date: moment(d.date).format('lll'),
                value: d.cachedBytes,
                category: "Cached Bandwidth"
            }))

            setmultiChached(d => ([
                ...d,
                ...multipleCachedRequests,
                ...multipleUncachedRequests
            ]))
            setmultiType(d => ([
                ...d,
                ...multipleUnclassified,
                ...multipleBadBrowser
            ]))
            setmultiChachedBytes(d => ([
                ...d,
                ...multipleUncachedBandwidth,
                ...multipleCachedBandwidth
            ]))

            const total = (arr, types) => {
                return arr.reduce((accum, item) => accum + item[types], 0)
            }

            mapMulti.map(d => {
                for (const key in d) {
                    maps.push(d[key])
                }
            })

            newclientSSLMap.map(d => {
                for (const key in d) {
                    itemsSsl.push(d[key])
                }
            })
            threatPathingMap.map(d => {
                for (const key in d) {
                    threatPathing.push(d[key])
                }
            })
            browserMap.map(d => {
                for (const key in d) {
                    crawlbot.push(d[key])
                }
            })

            maps = [
                ...maps.reduce((map, item) => {
                    // construct key from _id
                    // update map, if prev not found, set value as item, or update it with the added values
                    const key = item.key
                    const prev = map.get(item.key);
                    var filterednames = countryName.filter(function (obj) {
                        return obj.code === key
                    });
                    let div = <div class={`fi-${key.toLowerCase()} w-8 h-6 bg-cover bg-no-repeat rounded-lg overflow-hidden `}></div>
                    let country = filterednames[0]?.name
                    map.set(
                        key,
                        !prev ? { ...item, country, div } :
                            { ...item, country, bytes: prev.bytes + item.bytes, requests: prev.requests + item.requests, threats: prev.threats + item.threats, div }
                    );
                    return map;
                }, new Map)
                    // return map values
                    .values()
            ]

            let dataItems = {
                clientSsl: [
                    ...itemsSsl.reduce((map, item) => {
                        // construct key from _id
                        // update map, if prev not found, set value as item, or update it with the added values
                        const key = item.key
                        const prev = map.get(item.key);


                        map.set(
                            key,
                            !prev ? {
                                key: key, requests: item.requests, percents: (item.requests / total(customZone, "requests") * 100)
                            } :
                                { key: key, requests: prev.requests + item.requests, percents: ((prev.requests + item.requests) / total(customZone, "requests") * 100) }
                        );
                        return map;
                    }, new Map)
                        // return map values
                        .values()
                ],
                badBrowserList: [
                    ...threatPathing.reduce((map, item) => {
                        // construct key from _id
                        // update map, if prev not found, set value as item, or update it with the added values
                        const key = item.key
                        const prev = map.get(item.key);


                        map.set(
                            key,
                            !prev ? item :
                                { ...item, requests: prev.requests + item.requests }
                        );
                        return map;
                    }, new Map)
                        // return map values
                        .values()
                ],
                crawlbot: [
                    ...crawlbot.reduce((map, item) => {
                        // construct key from _id
                        // update map, if prev not found, set value as item, or update it with the added values
                        const key = item.key
                        const prev = map.get(item.key);


                        map.set(
                            key,
                            !prev ? item :
                                { ...item, pageViews: prev.pageViews + item.pageViews }
                        );
                        return map;
                    }, new Map)
                        // return map values
                        .values()
                ],

            }


            let sortBa = (props, arr) => arr.sort(function (a, b) {
                return b[props] - a[props];
            });
            setzoneData(({
                topCountry: sortBa("requests", maps).slice(0, 8),
                maps,
                dataItems,
                threads: {
                    totalSSLThreads: total(dataItems.clientSsl, "requests"),
                    totalThreats: total(customZone, "threats"),
                },
                unique: {
                    totalUnique: total(customZone, "uniques"),
                    uniqueMax: Math.max(...customZone.map(o => o.uniques)),
                    uniqueMin: Math.min(...customZone.map(o => o.uniques))
                },
                totalPercentCached: (total(customZone, "cachedBytes") / total(customZone, "bytes") * 100).toFixed(2),
                totalDataServed: total(customZone, "dataServed"),
                request: {
                    totalRequest: total(customZone, "requests"),
                    totalDataCachedRequests: total(customZone, "cachedRequests"),
                    totalDataCachedRequestsUncached: total(customZone, "requests") - total(customZone, "cachedRequests"),
                },
                bandwidth: {
                    totalBandwidth: total(customZone, "bytes"),
                    totalDataCachedBandwidth: total(customZone, "cachedBytes"),
                    totalDataCachedBandwidthUncached: total(customZone, "bytes") - total(customZone, "cachedBytes"),
                },

                customZone
            }))
        }
        return () => {
            maps = []
            setmultiChached([])
            setmultiChachedBytes([])
            setmultiType([])
        }

    }, [UserZoneAnalytics.data]);


    return ({
        zoneData,
        multiChached,
        multiChachedBytes,
        multiType,
        firewallLog,
        shield,
        traffic,
        trafficLoad: getTraffic.isValidating,
        loading: UserZoneAnalytics.isValidating,
        firewallLoad: postActivityLog.isValidating
    })
}