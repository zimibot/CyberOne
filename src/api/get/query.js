export const QueryHeadLines = {
    operationName: "GetHeadlineStats",
    query: `query GetHeadlineStats { 
        viewer {    
           accounts(filter: {accountTag: $accountTag}) {      
               statsOverTime: httpRequestsOverviewAdaptiveGroups(filter: $filter, limit: 2000) {        
                   sum {          
                       requests          
                       bytes          
                       pageViews          
                       cachedRequests          
                       cachedBytes          visits                  
                   }        
                   dimensions {          
                       timestamp: date                  
                   }              
               }      
               encryptedRequestsOverTime: httpRequestsOverviewAdaptiveGroups(filter: {AND: [$encryptedFilter, $filter]}, limit: 2000) {        
                   sum {          
                       requests          
                       bytes                  
                   }        
                   dimensions {          
                       timestamp: date                  
                   }              
               }      
               fourxxOverTime: httpRequestsOverviewAdaptiveGroups(filter: {AND: [$fourxxFilter, $filter]}, limit: 2000) {        
                   sum {          
                       requests                  
                   }        
                   dimensions {          
                       timestamp: date                  
                   }              
               }      
               fivexxOverTime: httpRequestsOverviewAdaptiveGroups(filter: {AND: [$fivexxFilter, $filter]}, limit: 2000) {        
                   sum {          
                       requests                  
                   }        
                   dimensions {          
                       timestamp: date                  
                   }              
               }      
               deltas: httpRequestsOverviewAdaptiveGroups(filter: $previousPeriodFilter, limit: 1) {        
                   sum {          
                       requests          
                       bytes          
                       cachedRequests          
                       cachedBytes          
                       pageViews          
                       visits                  
                   }              
               }      
               encryptedDeltas: httpRequestsOverviewAdaptiveGroups(filter: {AND: [$encryptedFilter, $previousPeriodFilter]}, limit: 10) {        
                   sum {          
                       requests          
                       bytes                  
                   }              
               }      
               fourxxDeltas: httpRequestsOverviewAdaptiveGroups(filter: {AND: [$fourxxFilter, $previousPeriodFilter]}, limit: 10) {        
                   sum {          
                       requests                  
                   }              
               }      
               fivexxDeltas: httpRequestsOverviewAdaptiveGroups(filter: {AND: [$fivexxFilter, $previousPeriodFilter]}, limit: 10) {        
                   sum {          
                       requests                  
                   }              
               }          
           }      
       }}`
}

export const QueryHttpProtocol = {
    operationName: "GetHttpProtocols",
    query: `query GetHttpProtocols {
          viewer {
            accounts(filter: {accountTag: $accountTag}) {
              total: httpRequestsOverviewAdaptiveGroups(filter: $filter, limit: 1) {
                sum {
                  requests
                }

      }
        httpProtocols: httpRequestsOverviewAdaptiveGroups(filter: $filter, limit: 5, orderBy: [sum_requests_DESC]) {
            sum {
                requests
    
        }
        dimensions {
            metric: clientRequestHTTPProtocol
    
        }
      }
    }
  }
}
    `
}

export const QuerySSL = {
    operationName: "SSLVersionsQuery",
    query: `query SSLVersionsQuery {
          viewer {
            accounts(filter: {accountTag: $accountTag}) {
              total: httpRequestsOverviewAdaptiveGroups(filter: $filter, limit: 1) {
                sum {
                  requests
             }
            
          }
          sslVersions: httpRequestsOverviewAdaptiveGroups(filter: $filter, limit: 5) {
                sum {
                  requests
            }
            dimensions {
                  metric: clientSSLProtocol
                  
            }
            
      }
          
    }
        
  }
}
    
    `
}

export const QueryTopContent = {
    operationName: "GetTopContentTypes",
    query: `query GetTopContentTypes {
          viewer {
            accounts(filter: {accountTag: $accountTag}) {
              total: httpRequestsOverviewAdaptiveGroups(filter: $filter, limit: 1) {
                sum {
                  requests
                  
            }
            
      }
          contentTypes: httpRequestsOverviewAdaptiveGroups(filter: $filter, limit: 5, orderBy: [sum_requests_DESC]) {
                sum {
                  requests
                  
            }
            dimensions {
                  metric: edgeResponseContentTypeName
                  
            }
            
      }
          
    }
        
  }
}
    `
}

export const QueryLocations = {
    operationName: "GetLocations",
    query: `query GetLocations {
        viewer {
            accounts(filter: {accountTag: $accountTag}) {
            locationTotals: httpRequestsOverviewAdaptiveGroups(filter: $filter, limit: 1000, orderBy: [sum_requests_DESC]) {
                sum {
                    requests
                    bytes
                }
                dimensions {
                    clientCountryName
                }
            }
        }   
    }
}
        
    `
}

export const QueryLocationsSparkline = {
    operationName: "GetLocationsSparkline",
    query: `query GetLocationsSparkline {
          viewer {
            accounts(filter: {accountTag: $accountTag}) {
              locationSparklines: httpRequestsOverviewAdaptiveGroups(filter: $filter, limit: 5000) {
                sum {
                  requests
                  bytes
                  
            }
            dimensions {
                  clientCountryName
                  ts: date
                  
            }
            
      }
          
    }
        
  }
}
    `
}

export const QueryUserZoneAnalytics = {
    operationName: "GetZoneAnalytics",
    query: `query GetZoneAnalytics($zoneTag: string, $since: string, $until: string) {
          viewer {
            zones(filter: {zoneTag: $zoneTag}) {
              totals: httpRequests1hGroups(limit: 10000, filter: {datetime_geq: $since, datetime_lt: $until}) {
                uniq {
                  uniques
                  
            }
            
      }
          zones: httpRequests1hGroups(orderBy: [datetime_ASC], limit: 10000, filter: {datetime_geq: $since, datetime_lt: $until}) {
                dimensions {
                  timeslot: datetime
                  
            }
            uniq {
                  uniques
                  
            }
            sum {
                  browserMap {
                    pageViews
                    key: uaBrowserFamily
                    
              }
              bytes
              cachedBytes
              cachedRequests
              contentTypeMap {
                    bytes
                    requests
                    key: edgeResponseContentTypeName
                    
              }
              clientSSLMap {
                    requests
                    key: clientSSLProtocol
                    
              }
              countryMap {
                    bytes
                    requests
                    threats
                    key: clientCountryName
                    
              }
              encryptedBytes
              encryptedRequests
              ipClassMap {
                    requests
                    key: ipType
                    
              }
              pageViews
              requests
              responseStatusMap {
                    requests
                    key: edgeResponseStatus
                    
              }
              threats
              threatPathingMap {
                    requests
                    key: threatPathingName
                    
              }
              
        }
            
      }
          
    }
        
  }
}
    
    `
}

export const QueryActivityLogQuery = {
    operationName: "ActivityLogQuery",
    query: `query ActivityLogQuery($zoneTag: string, $filter: FirewallEventsAdaptiveGroupsFilter_InputObject, $activityFilter: FirewallEventsAdaptiveFilter_InputObject, $limit: int64!) {
        viewer {
          zones(filter: {zoneTag: $zoneTag}) {
            total: firewallEventsAdaptiveByTimeGroups(limit: 1, filter: $filter) {
              count
              avg {
                sampleInterval
            }
            
        }
          activity: firewallEventsAdaptive(filter: $activityFilter, limit: $limit, orderBy: [datetime_DESC, rayName_DESC, matchIndex_ASC]) {
              action
              clientASNDescription
              clientAsn
              clientCountryName
              clientIP
              clientRequestHTTPHost
              clientRequestHTTPMethodName
              clientRequestHTTPProtocol
              clientRequestPath
              clientRequestQuery
              datetime
              rayName
              ruleId
              rulesetId
              source
              userAgent
              matchIndex
              metadata {
                key
                value
                
            }
            sampleInterval
            
        }
          
      }
        
    }
  }
    
    
    `
}

export const QueryGetTrafficDistribution = {
    operationName: "GetTrafficDistribution",
    query: `query GetTrafficDistribution($zoneTag: string, $filter: ZoneHttpRequestsAdaptiveGroupsFilter_InputObject) {
        viewer {
          zones(filter: {zoneTag: $zoneTag}) {
            trafficDistribution: httpRequestsAdaptiveGroups(filter: $filter, limit: 10) {
              dimensions {
                botManagementDecision
              
            }
            count
            avg {
                sampleInterval
              
            }
          
        }
        
      }
      
    }
  }
    
    
    
    `
}

