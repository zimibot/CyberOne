import axios from "axios";
import useSWR from "swr";
import {
    QueryActivityLogQuery,
    QueryGetTrafficDistribution,
    QueryHeadLines,
    QueryHttpProtocol,
    QueryLocations,
    QueryLocationsSparkline,
    QuerySSL,
    QueryTopContent,
    QueryUserZoneAnalytics
} from "./query";

const token = "CMMaef0YoeXUKwJTFFeKaUj64Dfgeb7ZrlBC8d2Z"
// const token = "84f20947937fecb5995a63a37305558c03d0c"
const url = "https://api.cloudflare.com"
const accountID = "bd4f53990232be563c4b83d711d9b288"
const pathGraphql = '/client/v4/graphql'

let headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
}


const queryFull = (currentDate, previousDate, prevPeriodCurrent, Query) => {
    return {
        ...Query,
        variables: {
            accountTag: accountID,
            encryptedFilter: {
                clientSSLProtocol_neq: "none"
            },
            filter: {
                datetime_geq: previousDate,
                datetime_leq: currentDate
            },
            fivexxFilter: {
                edgeResponseStatus_geq: 500,
                edgeResponseStatus_leq: 599
            },
            fourxxFilter: {
                edgeResponseStatus_geq: 400,
                edgeResponseStatus_leq: 499
            },
            previousPeriodFilter: {
                datetime_geq: prevPeriodCurrent,
                datetime_leq: previousDate
            }
        }
    }
};


const queryFillterBydate = (currentDate, previousDate, Query) => {
    return {
        ...Query,
        variables: {
            accountTag: accountID,
            filter: {
                datetime_geq: previousDate,
                datetime_leq: currentDate
            },
        }
    }
};

const queryFillterByUsers = (currentDate, previousDate, Query, userId) => {
    return {
        ...Query,
        variables: {
            zoneTag: userId,
            since: previousDate,
            until: currentDate,

        }
    }
};

const queryFillterByTraffic = (currentDate, previousDate, Query, userId) => {
    return {
        ...Query,
        variables: {
            "zoneTag": userId,
            "filter": {
                "AND": [
                    {
                        "datetimeMinute_geq": previousDate
                    },
                    {
                        "datetimeMinute_leq": currentDate
                    },
                    {
                        "botManagementDecision_neq": "other"
                    },
                    {
                        "requestSource": "eyeball"
                    },
                    {
                        "clientIP_neq": "2a06:98c0:3600::103"
                    }
                ]
            }
        }
    }
};

const queryLog = (currentDate, previousDate, Query, userId) => {
    return {
        ...Query,
        variables: {
            "zoneTag": userId,
            "filter": {
                "AND": [
                    {
                        "datetime_geq": previousDate,
                        "datetime_leq": currentDate
                    },
                    {
                        "AND": [
                            {
                                "action_neq": "challenge_solved"
                            },
                            {
                                "action_neq": "challenge_failed"
                            },
                            {
                                "action_neq": "challenge_bypassed"
                            },
                            {
                                "action_neq": "jschallenge_solved"
                            },
                            {
                                "action_neq": "jschallenge_failed"
                            },
                            {
                                "action_neq": "jschallenge_bypassed"
                            },
                            {
                                "action_neq": "managed_challenge_skipped"
                            },
                            {
                                "action_neq": "managed_challenge_non_interactive_solved"
                            },
                            {
                                "action_neq": "managed_challenge_interactive_solved"
                            },
                            {
                                "action_neq": "managed_challenge_bypassed"
                            },
                            {
                                "OR": [
                                    {
                                        "ruleId_like": "999___"
                                    },
                                    {
                                        "ruleId_like": "900___"
                                    },
                                    {
                                        "ruleId": "981176"
                                    },
                                    {
                                        "AND": [
                                            {
                                                "ruleId_notlike": "9_____"
                                            },
                                            {
                                                "ruleId_notlike": "uri-9_____"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            "limit": 10000,
            "activityFilter": {
                "AND": [
                    {
                        "datetime_geq": previousDate,
                        "datetime_leq": currentDate
                    },
                    {
                        "AND": [
                            {
                                "action_neq": "challenge_solved"
                            },
                            {
                                "action_neq": "challenge_failed"
                            },
                            {
                                "action_neq": "challenge_bypassed"
                            },
                            {
                                "action_neq": "jschallenge_solved"
                            },
                            {
                                "action_neq": "jschallenge_failed"
                            },
                            {
                                "action_neq": "jschallenge_bypassed"
                            },
                            {
                                "action_neq": "managed_challenge_skipped"
                            },
                            {
                                "action_neq": "managed_challenge_non_interactive_solved"
                            },
                            {
                                "action_neq": "managed_challenge_interactive_solved"
                            },
                            {
                                "action_neq": "managed_challenge_bypassed"
                            },
                            {
                                "OR": [
                                    {
                                        "ruleId_like": "999___"
                                    },
                                    {
                                        "ruleId_like": "900___"
                                    },
                                    {
                                        "ruleId": "981176"
                                    },
                                    {
                                        "AND": [
                                            {
                                                "ruleId_notlike": "9_____"
                                            },
                                            {
                                                "ruleId_notlike": "uri-9_____"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    }
};


const fetcher = (url) => axios.get(url, {
    headers: headers
}).then(d => d.data);

const fechGraphql = (param) => axios({
    url: param.url,
    method: 'post',
    headers: headers,
    data: param.data
}).then(d => d.data.data.viewer);

export const getAssetsList = () => {

    const { data, error } = useSWR(
        `${url}/client/v4/zones`,
        fetcher
    );

    return {
        data,
        error
    }

}

export const getPageShield = ({ userId, search = "", hosts }, limit = 15, page = 1) => {

    const { data, error, isValidating } = useSWR(
        `${url}/client/v4/zones/${userId}/page_shield/scripts?page=${page}&per_page=${limit}&exclude_cdn_cgi=true&urls=${search}&hosts=${hosts}`,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            revalidateIfStale: true
        }
    );

    return {
        data,
        error,
        isValidating
    }

}


export const postAccountAssetsDashboard = ({ date }) => {

    const { data, error, isValidating } = useSWR(
        {
            url: `${url}${pathGraphql}`,
            data: queryFull(date?.currentDate, date?.previousDate, date?.previousPeriodFilter.currentDatePrev, QueryHeadLines)
        },
        date ? fechGraphql : {}
    );

    return {
        data,
        error,
        isValidating
    }

}

export const postAccountHTTP = ({ date }) => {

    const { data, error, isValidating } = useSWR(
        {
            url: `${url}${pathGraphql}`,
            data: queryFillterBydate(date?.currentDate, date?.previousDate, QueryHttpProtocol)
        },
        date ? fechGraphql : {}
    );

    return {
        data,
        error,
        isValidating
    }

}

export const postAccountSSL = ({ date }) => {

    const { data, error, isValidating } = useSWR(
        {
            url: `${url}${pathGraphql}`,
            data: queryFillterBydate(date?.currentDate, date?.previousDate, QuerySSL)
        },
        date ? fechGraphql : {}
    );

    return {
        data,
        error,
        isValidating
    }

}

export const postAccountTopContent = ({ date }) => {

    const { data, error, isValidating } = useSWR(
        {
            url: `${url}${pathGraphql}`,
            data: queryFillterBydate(date?.currentDate, date?.previousDate, QueryTopContent)
        },
        date ? fechGraphql : {}
    );

    return {
        data,
        error,
        isValidating
    }

}

export const postAccountLocationsSparkline = ({ date }) => {
    const { data, error, isValidating } = useSWR(
        {
            url: `${url}${pathGraphql}`,
            data: queryFillterBydate(date?.currentDate, date?.previousDate, QueryLocationsSparkline)
        },
        date ? fechGraphql : {}
    );

    return {
        data,
        error,
        isValidating
    }

}

export const postAccountLocations = ({ date }) => {
    const { data, error, isValidating } = useSWR(
        {
            url: `${url}${pathGraphql}`,
            data: queryFillterBydate(date?.currentDate, date?.previousDate, QueryLocations)
        },
        date ? fechGraphql : {}
    );

    return {
        data,
        error,
        isValidating
    }

}


export const postUserZoneAnalytics = ({ date, userId = "59d6bd1b4b0a684c3223d701a2f6e298" }) => {
    const { data, error, isValidating } = useSWR(
        {
            url: `${url}${pathGraphql}`,
            data: queryFillterByUsers(date?.currentDate, date?.previousDate, QueryUserZoneAnalytics, userId)
        },
        date && userId ? fechGraphql : {},
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            revalidateIfStale: true
        }
    );

    return {
        data,
        error,
        isValidating
    }

}


export const postActivityLogQuery = ({ date, userId = "59d6bd1b4b0a684c3223d701a2f6e298" }) => {
    const { data, error, isValidating } = useSWR(
        {
            url: `${url}${pathGraphql}`,
            data: queryLog(date?.currentDate, date?.previousDate, QueryActivityLogQuery, userId)
        },
        date && userId ? fechGraphql : {},
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            revalidateIfStale: true
        }
    );

    return {
        data,
        error,
        isValidating
    }

}


export const postQueryGetTrafficDistribution = ({ date, userId = "59d6bd1b4b0a684c3223d701a2f6e298" }) => {
    const { data, error, isValidating } = useSWR(
        {
            url: `${url}${pathGraphql}`,
            data: queryFillterByTraffic(date?.currentDate, date?.previousDate, QueryGetTrafficDistribution, userId)
        },
        date && userId ? fechGraphql : {},
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            revalidateIfStale: true
        }
    );

    return {
        data,
        error,
        isValidating
    }

}